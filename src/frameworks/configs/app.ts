import express, { Express } from "express";
import cors from 'cors'
import logger from 'morgan'
import dotenv from "dotenv";

//Routes
import menteeRouter from '../routes/mentee.route'

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app: Express = express();

//cors
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

//morgan
app.use(logger('dev'))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Mentee Routes
app.use('/api/mentee',menteeRouter)

export default app;