import express, { Express } from "express";

import dotenv from "dotenv";

//Routes
import menteeRouter from '../routes/user.route'

// Load environment variables from .env file
dotenv.config();


// Initialize express application
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Mentee Routes
app.use('/api/mentee',menteeRouter)


export default app;