import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReactionService } from './reaction.service';
import { Reaction } from '@prisma/client';

const createUserReaction = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const { ...reactionData } = req.body;
  const result = await ReactionService.createUserReaction(user, reactionData);
  sendResponse<Reaction>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Reaction created successfully',
    data: result,
  });
});
const getAllReactionBySingleVideo = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;  
    const result = await ReactionService.getAllReactionBySingleVideo(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reactions retrived successfully',
      data: result,
    });
  }
);

export const ReactionController = {
  createUserReaction,
  getAllReactionBySingleVideo,
};
