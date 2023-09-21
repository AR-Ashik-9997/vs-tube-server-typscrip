import express from 'express';
import { PlayListController } from './playList.controller';
const router = express.Router();
router.post('/', PlayListController.CreatePlayList);
router.get('/', PlayListController.GetAllPlaylists);
router.get('/:id', PlayListController.GetSinglePlaylists);
router.get('/views/:id', PlayListController.GetSinglePlaylistViews);
export const PlayListRoutes = router;
