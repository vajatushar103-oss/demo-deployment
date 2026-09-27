import serverless from "serverless-http";
import { app } from "../../src/app.js";
import { connectDB } from "../../src/config/db.js";

await connectDB();

export const handler = serverless(app);