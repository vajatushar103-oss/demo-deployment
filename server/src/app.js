import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';

import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import productRoutes from './routes/productRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
// import userRoutes from './routes/userRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import videoRoutes from './routes/video.routes.js';



const app = express();

app.use(express.json());
app.use(cors({
     origin: env.clientUrl,
     credentials:true
    }));
app.use(cookieParser());
// app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));


app.get('/api/health', (req, res) => res.json({ ok: true, service: 'prime-machines-api' }));
// app.use('/api/users', userRoutes);


/* using all the routes here */
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/videos', videoRoutes);

app.use((req, res, next) => {
    console.log("========== API REQUEST ==========");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Origin:", req.headers.origin);
    console.log("=================================");

    next();
});

app.use(notFound);
app.use(errorHandler);


export {app}