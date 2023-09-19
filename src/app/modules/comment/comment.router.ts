import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CommentController } from './comment.controller';

const router = express.Router();
router.post('/', auth(ENUM_USER_ROLE.USER), CommentController.CreateComment);
router.get('/:id', CommentController.getAllCommentBySingleVideo);
export const CommentRoutes = router;
