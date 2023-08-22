import express from 'express';
import { PlayListRoutes } from '../modules/playList/playList.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: "/play_lists",
    routes: PlayListRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
