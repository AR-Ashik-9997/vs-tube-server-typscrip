import express from 'express';
import { CommentController } from './comment.controller';

const router = express.Router();
router.post('/', CommentController.CreateComment);
export const CommentRoutes = router;
