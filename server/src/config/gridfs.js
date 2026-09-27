import mongoose from 'mongoose';

const VIDEO_BUCKET_NAME = 'videos';

/*
|--------------------------------------------------------------------------
| Use the SAME MongoDB driver that Mongoose uses.
|--------------------------------------------------------------------------
|
| Do NOT import GridFSBucket from:
|
| import { GridFSBucket } from 'mongodb';
|
| because that can introduce another MongoDB/BSON version.
|
*/

const {
    GridFSBucket
} = mongoose.mongo;


let videoBucket = null;


/*
|--------------------------------------------------------------------------
| Get GridFS bucket
|--------------------------------------------------------------------------
*/

export function getVideoBucket() {

    const db =
        mongoose.connection.db;


    if (!db) {

        throw new Error(
            'MongoDB connection is not ready.'
        );

    }


    if (!videoBucket) {

        videoBucket =
            new GridFSBucket(
                db,
                {
                    bucketName:
                        VIDEO_BUCKET_NAME
                }
            );

    }


    return videoBucket;
}


export {
    VIDEO_BUCKET_NAME
};