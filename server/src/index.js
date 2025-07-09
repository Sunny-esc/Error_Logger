import express from 'express';
import {app} from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
dotenv.config({
    path: './src/.env'
});

connectDB()
    .then(() => {
        const port = process.env.PORT || 10000;
        app.listen(port,"0.0.0.0", () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
        if (!process.env.PORT) {
            console.warn('Warning: PORT environment variable is not set. running on default port 2000');
        }
        if (!port || isNaN(port)) {
            console.error('Error: PORT environment variable is not a valid number.');
        }
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with failure
    });
