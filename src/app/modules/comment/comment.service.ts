import { Comment } from '@prisma/client';
import prisma from '../../../shared/prisma';

const CreateComment = async (payload: Comment): Promise<Comment> => {
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

export const CommentService = { CreateComment };
