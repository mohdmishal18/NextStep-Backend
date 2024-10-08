import express, { Express } from "express";
import cors from 'cors'
import logger from 'morgan'
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//Routes
import menteeRouter from '../routes/mentee.route'
import mentorRouter from '../routes/mentor.route'
import adminRouter from '../routes/admin.route'
import postRouter from '../routes/post.route'
import commentRouter from '../routes/comment.route'
import followRouter from '../routes/follow.route'


// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app: Express = express();

//cors
app.use(
    cors({
        origin: process.env.ORIGIN,
        credentials: true
    })
)

// Cookie Parser
app.use(cookieParser());


//morgan
app.use(logger('dev'))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Mentee Routes
app.use('/api/mentee',menteeRouter)
app.use('/api/mentor',mentorRouter)
app.use('/api/admin',adminRouter)
app.use('/api/posts', postRouter)
app.use('/api/comments', commentRouter)
app.use('/api/follows',followRouter)

export default app;