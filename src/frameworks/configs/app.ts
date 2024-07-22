import express from "express";

import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

export default app;