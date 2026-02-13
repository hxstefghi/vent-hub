import express from 'express';
import postController from '../controllers/post.controller.js';
import { validatePost, validatePagination } from '../middleware/validate.middleware.js';
import { createPostLimiter, likeLimiter } from '../middleware/rateLimit.middleware.js';

const router = express.Router();

// Statistics route (must be before :id route)
router.get('/stats', postController.getPostsStats);

// Post CRUD routes
router.post('/', createPostLimiter, validatePost, postController.createPost);
router.get('/', validatePagination, postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', postController.deletePost);

// Like route
router.patch('/:id/like', likeLimiter, postController.likePost);

export default router;
