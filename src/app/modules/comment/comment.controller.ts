import { Comment } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CommentService } from './comment.service';

const CreateComment = catchAsync(async (req: Request, res: Response) => {
  const { ...commentData } = req.body;
  const result = await CommentService.CreateComment(commentData);
  sendResponse<Comment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});

export const CommentController = { CreateComment };
