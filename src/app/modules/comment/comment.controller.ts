import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { CommentService } from "./comment.service";
import { Comment } from "@prisma/client";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const CreateComment = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload = req.user!;
  const { ...commentData } = req.body;
  const result = await CommentService.CreateComment(user, commentData);
  sendResponse<Comment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment created successfully',
    data: result,
  });
});
const getAllCommentBySingleVideo = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await CommentService.getAllCommentBySingleVideo(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Comment retrived successfully',
      data: result,
    });
  }
);

export const CommentController = { CreateComment, getAllCommentBySingleVideo };
