import { Router } from "express";
import bodyParser from "body-parser";

const headers = Router();

// Use body-parser middleware
headers.use(bodyParser.json());
headers.use(bodyParser.urlencoded({ extended: false }));

console.log("part1");

// Set CORS headers
headers.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

export default headers;
