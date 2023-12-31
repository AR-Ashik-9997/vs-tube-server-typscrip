import express from 'express';
import { AuthRouts } from '../modules/auth/auth.router';
import { CommentRoutes } from '../modules/comment/comment.router';
import { PlayListRoutes } from '../modules/playList/playList.router';
import { UserReactionRoutes } from './../modules/UserReaction/reaction.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: AuthRouts,
  },
  {
    path: '/play_lists',
    routes: PlayListRoutes,
  },
  {
    path: '/comments',
    routes: CommentRoutes,
  },
  {
    path: '/reactions',
    routes: UserReactionRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
