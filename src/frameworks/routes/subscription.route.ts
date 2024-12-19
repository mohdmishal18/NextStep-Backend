import express, { Router } from 'express';
import mentorAuth from '../middlewares/mentor.auth';
import { createSubscriptionController } from '../configs/factories/subscription.factory';

const subscriptionController = createSubscriptionController()

const router: Router = express.Router()

router.get('/',mentorAuth,subscriptionController.fetch)
router.post('/create',mentorAuth,subscriptionController.create)

export default router;