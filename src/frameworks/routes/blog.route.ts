import express, { Router } from 'express';
import mentorAuth from '../middlewares/mentor.auth';
import { createBlogController } from '../factories/blog.factory';

// Get the BlogController from the container using the symbol from TYPES
const blogController = createBlogController()

const router: Router = express.Router();

// Define routes
router.get('/',blogController.fetch)
router.post('/create', mentorAuth, blogController.create);
router.get('/:id',mentorAuth,blogController.fetchById)

export default router;