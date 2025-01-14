import express, { Router } from 'express';
import { createSearchController } from '../configs/factories/search.factory';

const searchController = createSearchController();
const router: Router = express.Router();

router.get("/search-mentors", searchController.searchMentors);
router.get("/search-posts", searchController.searchPosts);
router.get("/search-mentees", searchController.searchMentees);

export default router;