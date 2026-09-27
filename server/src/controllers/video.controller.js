import mongoose from 'mongoose';
import {
    getVideoBucket,
    VIDEO_BUCKET_NAME
} from '../config/gridfs.js';

const HOME_VIDEO_FILENAME = 'homepage.mp4';

function getFilesCollection() {
    const db = mongoose.connection.db;

    if (!db) {
        throw new Error('MongoDB connection is not ready.');
    }

    return db.collection(`${VIDEO_BUCKET_NAME}.files`);
}

function toObjectId(value) {

    if (!mongoose.isValidObjectId(value)) {
        return null;
    }

    return new mongoose.mongo.ObjectId(value);
}

/*
|--------------------------------------------------------------------------
| GET CURRENT HOME VIDEO
|--------------------------------------------------------------------------
|
| Finds the newest homepage.mp4 in GridFS.
|
| We intentionally cache only this small metadata response for 60 seconds.
| The actual MP4 gets a completely different immutable URL.
|
*/

export async function getCurrentHomeVideo(req, res) {
    try {
        const file = await getFilesCollection().findOne(
            {
                filename: HOME_VIDEO_FILENAME
            },
            {
                sort: {
                    uploadDate: -1
                }
            }
        );

        if (!file) {
            return res.status(404).json({
                message: `No ${HOME_VIDEO_FILENAME} file exists in MongoDB GridFS.`
            });
        }

        res.set(
            'Cache-Control',
            'public, max-age=60, must-revalidate'
        );

        return res.json({
            id: file._id.toString(),
            filename: file.filename,
            mimeType: file.metadata?.contentType || 'video/mp4',
            size: file.length,
            updatedAt: file.uploadDate
        });

    } catch (error) {
        console.error(
            '[Video] getCurrentHomeVideo:',
            error
        );

        return res.status(500).json({
            message: 'Unable to load the home video.'
        });
    }
}


/*
|--------------------------------------------------------------------------
| RANGE PARSER
|--------------------------------------------------------------------------
|
| Examples:
|
| bytes=0-999
| bytes=1000-1999
| bytes=1000-
| bytes=-500
|
*/

function parseRange(rangeHeader, size) {
    if (!rangeHeader) {
        return null;
    }

    const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);

    if (!match) {
        return 'invalid';
    }

    const [
        ,
        startText,
        endText
    ] = match;

    let start;
    let end;

    // Example:
    // bytes=-500
    //
    // Means last 500 bytes.
    if (startText === '') {

        const suffixLength = Number(endText);

        if (
            !Number.isInteger(suffixLength) ||
            suffixLength <= 0
        ) {
            return 'invalid';
        }

        start = Math.max(
            0,
            size - suffixLength
        );

        end = size - 1;

    } else {

        start = Number(startText);

        end =
            endText === ''
                ? size - 1
                : Number(endText);

        if (
            !Number.isInteger(start) ||
            !Number.isInteger(end)
        ) {
            return 'invalid';
        }

        if (
            start < 0 ||
            start >= size ||
            end < start
        ) {
            return 'invalid';
        }

        end = Math.min(
            end,
            size - 1
        );
    }

    return {
        start,
        end
    };
}


/*
|--------------------------------------------------------------------------
| STREAM VIDEO
|--------------------------------------------------------------------------
|
| GET /api/videos/stream/:id
|
| Supports:
|
| 200 OK
| 206 Partial Content
| 416 Range Not Satisfiable
|
*/

export async function streamVideo(req, res) {

    try {

        const fileId = toObjectId(
            req.params.id
        );

        if (!fileId) {
            return res.status(400).json({
                message: 'Invalid video id.'
            });
        }

        const file =
            await getFilesCollection().findOne({
                _id: fileId
            });

        if (!file) {
            return res.status(404).json({
                message: 'Video not found.'
            });
        }

        const mimeType =
            file.metadata?.contentType ||
            'video/mp4';

        const etag =
            `"${file._id.toString()}-${file.length}"`;


        /*
        |--------------------------------------------------------------------------
        | IMPORTANT CACHE SETTINGS
        |--------------------------------------------------------------------------
        |
        | The GridFS ID is inside the URL.
        |
        | If staff uploads a new video:
        |
        | old:
        | /api/videos/stream/ABC
        |
        | new:
        | /api/videos/stream/XYZ
        |
        | Therefore we can safely cache this URL for a long time.
        |
        */

        res.set({
            'Content-Type': mimeType,

            'Accept-Ranges': 'bytes',

            'Cache-Control':
                'public, max-age=31536000, immutable',

            ETag: etag,

            'Last-Modified':
                new Date(file.uploadDate)
                    .toUTCString(),

            'Content-Disposition':
                'inline'
        });


        /*
        |--------------------------------------------------------------------------
        | NOT MODIFIED
        |--------------------------------------------------------------------------
        */

        if (
            req.headers['if-none-match'] === etag &&
            !req.headers.range
        ) {
            return res.status(304).end();
        }


        /*
        |--------------------------------------------------------------------------
        | RANGE
        |--------------------------------------------------------------------------
        */

        const range = parseRange(
            req.headers.range,
            file.length
        );


        if (range === 'invalid') {

            res.set(
                'Content-Range',
                `bytes */${file.length}`
            );

            return res.status(416).end();
        }


        const bucket =
            getVideoBucket();


        /*
        |--------------------------------------------------------------------------
        | FULL VIDEO
        |--------------------------------------------------------------------------
        */

        if (!range) {

            res.set(
                'Content-Length',
                String(file.length)
            );

            const downloadStream =
                bucket.openDownloadStream(
                    file._id
                );

            downloadStream.on(
                'error',
                (error) => {

                    console.error(
                        '[Video] stream error:',
                        error
                    );

                    if (!res.headersSent) {
                        res.status(500).end();
                    } else {
                        res.destroy(error);
                    }
                }
            );

            return downloadStream.pipe(res);
        }


        /*
        |--------------------------------------------------------------------------
        | PARTIAL VIDEO
        |--------------------------------------------------------------------------
        */

        const contentLength =
            range.end -
            range.start +
            1;

        res.status(206).set({

            'Content-Length':
                String(contentLength),

            'Content-Range':
                `bytes ${range.start}-${range.end}/${file.length}`
        });


        const downloadStream =
            bucket.openDownloadStream(
                file._id,
                {
                    start: range.start,

                    end:
                        range.end + 1
                }
            );


        downloadStream.on(
            'error',
            (error) => {

                console.error(
                    '[Video] range stream error:',
                    error
                );

                if (!res.headersSent) {
                    res.status(500).end();
                } else {
                    res.destroy(error);
                }
            }
        );


        return downloadStream.pipe(res);

    } catch (error) {

        console.error(
            '[Video] streamVideo:',
            error
        );

        if (!res.headersSent) {

            return res.status(500).json({
                message:
                    'Unable to stream the video.'
            });

        }

        return res.destroy(error);
    }
}