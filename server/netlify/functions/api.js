import serverless from "serverless-http";

import { app } from "../../src/app.js";
import { connectDB } from "../../src/config/db.js";

let dbPromise;

async function getHandler() {
    if (!dbPromise) {
        dbPromise = connectDB();
    }

    await dbPromise;

    return serverless(app);
}

export async function handler(event, context) {
    const handler = await getHandler();

    return handler(event, context);
}