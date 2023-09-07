import { Comment } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const CreateComment = async (
  user: JwtPayload,
  payload: Comment
): Promise<Comment> => {
  const { id, name, image } = user;
  const result = await prisma.comment.create({
    data: {
      userId: id,
      username: name,
      image: image,
      playlistId: payload.playlistId,
      comment: payload.comment,
    },
  });
  return result;
};

export const CommentService = { CreateComment };
