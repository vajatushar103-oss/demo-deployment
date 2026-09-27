import 'dotenv/config';

import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import {
    getVideoBucket
} from '../config/gridfs.js';


const filePath = process.argv[2];

const filename =
    process.argv[3] ||
    'homepage.mp4';


/*
|--------------------------------------------------------------------------
| VALIDATION
|--------------------------------------------------------------------------
*/

if (!filePath) {

    console.error(
        'Usage: node src/scripts/uploadVideo.js "C:\\path\\to\\video.mp4" [filename]'
    );

    process.exit(1);
}


const absolutePath =
    path.resolve(filePath);


if (!fs.existsSync(absolutePath)) {

    console.error(
        `Video file not found: ${absolutePath}`
    );

    process.exit(1);
}


const stat =
    fs.statSync(absolutePath);


if (!stat.isFile()) {

    console.error(
        `Not a file: ${absolutePath}`
    );

    process.exit(1);
}


if (
    path.extname(absolutePath)
        .toLowerCase() !== '.mp4'
) {

    console.error(
        'Only .mp4 files are accepted.'
    );

    process.exit(1);
}


/*
|--------------------------------------------------------------------------
| UPLOAD
|--------------------------------------------------------------------------
*/

async function upload() {

    try {

        const mongoUri =
            process.env.MONGODB_URI;


        if (!mongoUri) {

            throw new Error(
                'MONGODB_URI is missing from the server .env file.'
            );
        }


        await mongoose.connect(
            mongoUri
        );


        console.log(
            'Connected to MongoDB.'
        );


        const bucket =
            getVideoBucket();


        const uploadStream =
            bucket.openUploadStream(
                filename,
                {
                    contentType:
                        'video/mp4',

                    metadata: {

                        contentType:
                            'video/mp4',

                        purpose:
                            'homepage-video',

                        originalName:
                            path.basename(
                                absolutePath
                            )
                    }
                }
            );


        await new Promise(
            (resolve, reject) => {

                const input =
                    fs.createReadStream(
                        absolutePath
                    );


                input.on(
                    'error',
                    reject
                );

                uploadStream.on(
                    'error',
                    reject
                );

                uploadStream.on(
                    'finish',
                    resolve
                );


                input.pipe(
                    uploadStream
                );
            }
        );


        console.log('');
        console.log(
            '================================'
        );

        console.log(
            'VIDEO UPLOAD SUCCESSFUL'
        );

        console.log(
            '================================'
        );

        console.log(
            `Filename : ${filename}`
        );

        console.log(
            `Size     : ${
                (
                    stat.size /
                    1024 /
                    1024
                ).toFixed(2)
            } MB`
        );

        console.log(
            `GridFS ID: ${
                uploadStream.id.toString()
            }`
        );

        console.log(
            `Stream   : /api/videos/stream/${
                uploadStream.id.toString()
            }`
        );

        console.log(
            '================================'
        );

        console.log('');
        console.log(
            'For the homepage, keep the filename as homepage.mp4.'
        );

    } catch (error) {

        console.error(
            'Video upload failed:',
            error
        );

        process.exitCode = 1;

    } finally {

        await mongoose.disconnect();
    }
}


upload();