import { Comment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CommentService } from './comment.service';
import { JwtPayload } from 'jsonwebtoken';

const CreateComment = catchAsync(async (req: Request, res: Response) => {
  const user:JwtPayload=req.user!;
  const { ...commentData } = req.body;
  const result = await CommentService.CreateComment(user,commentData);
  sendResponse<Comment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

export const CommentController = { CreateComment };
