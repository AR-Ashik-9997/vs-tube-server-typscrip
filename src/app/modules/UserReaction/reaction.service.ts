import { Reaction } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const createUserReaction = async (
  user: JwtPayload,
  payload: Reaction
) => {
  const { id } = user;
  const existingUserLike = await prisma.reaction.findFirst({
    where: { userId: id },
  });
  if (
    existingUserLike &&
    existingUserLike.userId === id &&
    existingUserLike.playlistId === payload.playlistId &&
    parseInt(existingUserLike.likes) === 0
  ) {
     return await prisma.reaction.update({
      where: { id: existingUserLike.id },
      data: {
        likes: payload.likes,
      },
    });
  }
  else{
     return await prisma.reaction.create({
      data: {
        userId: id,
        likes: payload.likes,
        dislikes: payload.dislikes,
        playlistId: payload.playlistId,
      },
    });    
  } 
  
};

const getAllReactionBySingleVideo = async (
  id: string
): Promise<Reaction | null> => {
  const result = await prisma.reaction.findFirst({
    where: { playlistId: id },
  });
  return result;
};

export const ReactionService = {
  createUserReaction,
  getAllReactionBySingleVideo,
};
