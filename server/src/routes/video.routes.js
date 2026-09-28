import { Router } from 'express';

import {
    getCurrentHomeVideo,
    streamVideo
} from '../controllers/video.controller.js';

const router = Router();

/*
|--------------------------------------------------------------------------
| PUBLIC VIDEO ROUTES
|--------------------------------------------------------------------------
*/

// Get current homepage video metadata
router.get(
    '/home',
    getCurrentHomeVideo
);


// Stream actual MP4
router.get(
    '/stream/:id',
    streamVideo
);

export { router };