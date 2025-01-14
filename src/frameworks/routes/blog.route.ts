import express, { Router } from 'express';
import mentorAuth from '../middlewares/mentor.auth';
import { createBlogController } from '../configs/factories/blog.factory';

// Get the BlogController from the container using the symbol from TYPES
const blogController = createBlogController()

const router: Router = express.Router();

// Define routes
router.get('/',blogController.fetch)
router.post('/create', mentorAuth, blogController.create);
router.get('/:id',mentorAuth,blogController.fetchById);
router.put('/edit/:id',mentorAuth, blogController.edit)
// router.delete('/delete/:id',mentorAuth, blogController.delete)

export default router;