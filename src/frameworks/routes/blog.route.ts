import express, { Router } from 'express';
import mentorAuth from '../middlewares/mentor.auth';
import { container } from '../configs/inversify.config';
import { TYPES } from '../configs/types'; // Import TYPES to use symbols
import BlogController from '../../adapters/controllers/blog.controller';

// Get the BlogController from the container using the symbol from TYPES
const blogController = container.get<BlogController>(TYPES.BlogController);

const router: Router = express.Router();

// Define routes
router.post('/create', mentorAuth, blogController.create);

export default router;