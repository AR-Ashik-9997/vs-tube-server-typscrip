import { Reaction, ViewReaction } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const createUserReaction = async (
  user: JwtPayload,
  payload: Reaction
) => {
  const { id } = user;
  const like = parseInt(payload.likes);
  const dislike = parseInt(payload.dislikes);
  const existingUserLike = await prisma.reaction.findFirst({
    where: { userId: id, playlistId: payload.playlistId },
  });
  const viewReaction = await prisma.viewReaction.findFirst({
    where: {
      playlistId: payload.playlistId,
    },
  });
 
  return await prisma.$transaction(async tx => {
    if (!existingUserLike && like === 1) {
      await tx.reaction.create({
        data: {
          userId: id,
          likes: payload.likes,
          playlistId: payload.playlistId,
        },
      });
      if (viewReaction) {
        await tx.viewReaction.update({
          where: { id: viewReaction?.id },
          data: {
            likes: (
              parseInt(viewReaction?.likes) + parseInt(payload.likes)
            ).toString(),
          },
        });
      } else {
        await tx.viewReaction.create({
          data: {
            playlistId: payload.playlistId,
            likes: payload.likes,
          },
        });
      }
    } else if (!existingUserLike && dislike === 1) {
      await tx.reaction.create({
        data: {
          userId: id,
          dislikes: dislike.toString(),
          playlistId: payload.playlistId,
        },
      });
      if (viewReaction) {
        await tx.viewReaction.update({
          where: { id: viewReaction?.id },
          data: {
            dislikes: (parseInt(viewReaction?.dislikes) + dislike).toString(),
          },
        });
      } else {
        await tx.viewReaction.create({
          data: {
            playlistId: payload.playlistId,
            dislikes: dislike.toString(),
          },
        });
      }
    } else if (
      existingUserLike &&
      parseInt(existingUserLike.dislikes) === 0 &&
      dislike === 1
    ) {
      await tx.reaction.update({
        where: { id: existingUserLike?.id },
        data: {
          dislikes: dislike.toString(),
          likes: (parseInt(existingUserLike.likes) > 0
            ? parseInt(existingUserLike.likes) - dislike
            : 0
          ).toString(),
        },
      });
      if (viewReaction) {
        await tx.viewReaction.update({
          where: { id: viewReaction?.id },
          data: {
            dislikes: (parseInt(viewReaction?.dislikes) + dislike).toString(),
            likes: (parseInt(viewReaction?.likes) > 0
              ? parseInt(viewReaction?.likes) - dislike
              : 0
            ).toString(),
          },
        });
      }
    } else if (
      existingUserLike &&
      parseInt(existingUserLike.likes) === 0 &&
      like === 1
    ) {
      await tx.reaction.update({
        where: { id: existingUserLike?.id },
        data: {
          likes: like.toString(),
          dislikes: (parseInt(existingUserLike.dislikes) > 0
            ? parseInt(existingUserLike.dislikes) - like
            : 0
          ).toString(),
        },
      });
      if (viewReaction) {
        await tx.viewReaction.update({
          where: { id: viewReaction?.id },
          data: {
            likes: (parseInt(viewReaction?.likes) + like).toString(),
            dislikes: (parseInt(viewReaction?.dislikes) > 0
              ? parseInt(viewReaction?.dislikes) - like
              : 0
            ).toString(),
          },
        });
      }
    }
  });
 
};

const getAllReactionBySingleVideo = async (
  id: string
): Promise<ViewReaction | null> => {
  const result = await prisma.viewReaction.findFirst({
    where: { playlistId: id },
  });
  return result;
};

export const ReactionService = {
  createUserReaction,
  getAllReactionBySingleVideo,
};
