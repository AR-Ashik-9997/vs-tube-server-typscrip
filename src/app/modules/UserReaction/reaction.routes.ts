import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReactionController } from './reaction.controller';
const router = express.Router();

router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  ReactionController.createUserReaction
);
router.get('/:id', ReactionController.getAllReactionBySingleVideo);
export const UserReactionRoutes = router;
