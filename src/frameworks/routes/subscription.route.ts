import express, { Router } from 'express';
import mentorAuth from '../middlewares/mentor.auth';
import { createSubscriptionController } from '../configs/factories/subscription.factory';

const subscriptionController = createSubscriptionController()

const router: Router = express.Router()

router.get('/',mentorAuth,subscriptionController.fetch)
router.post('/create',mentorAuth,subscriptionController.create)
router.put('/edit/:id',mentorAuth,subscriptionController.edit)
router.delete('/delete/:id',mentorAuth, subscriptionController.delete)

export default router;