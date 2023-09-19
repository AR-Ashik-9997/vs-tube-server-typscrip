import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post('/', AuthController.CreateUSerwithGoogle);
export const AuthRouts = router;
