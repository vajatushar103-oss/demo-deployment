import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { env } from './config/env.js';

import productRoutes from './routes/productRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import videoRoutes from './routes/video.routes.js';

import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

console.log("========== IMPORT TYPE CHECK ==========");
console.log("authRoutes:", typeof authRoutes);
console.log("adminRoutes:", typeof adminRoutes);
console.log("productRoutes:", typeof productRoutes);
console.log("enquiryRoutes:", typeof enquiryRoutes);
console.log("videoRoutes:", typeof videoRoutes);
console.log("notFound:", typeof notFound);
console.log("errorHandler:", typeof errorHandler);
console.log("========================================");

app.use(express.json());

app.use(cors({
    origin: env.clientUrl,
    credentials: true
}));

app.use(cookieParser());

app.get('/api/health', (req, res) => {
    res.json({
        ok: true,
        service: 'prime-machines-api'
    });
});

console.log("Mounting authRoutes...");
app.use('/api/auth', authRoutes);

console.log("Mounting adminRoutes...");
app.use('/api/admin', adminRoutes);

console.log("Mounting productRoutes...");
app.use('/api/products', productRoutes);

console.log("Mounting enquiryRoutes...");
app.use('/api/enquiries', enquiryRoutes);

console.log("Mounting videoRoutes...");
app.use('/api/videos', videoRoutes);

app.use((req, res, next) => {
    console.log("========== API REQUEST ==========");
    console.log("Method:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("Origin:", req.headers.origin);
    console.log("=================================");

    next();
});

console.log("Mounting notFound...");
app.use(notFound);

console.log("Mounting errorHandler...");
app.use(errorHandler);

console.log("========== EXPRESS APP READY ==========");

export { app };