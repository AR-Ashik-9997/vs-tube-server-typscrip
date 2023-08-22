import { Prisma, Yt_Playlist } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { PlayListsearchFields } from './playList.interface';
import { PlayListSearchableFields } from './playlist.constant';

const CreatePlayList = async (payload: Yt_Playlist): Promise<Yt_Playlist> => {
  const result = await prisma.yt_Playlist.create({
    data: payload,
  });
  return result;
};
const GetAllPlaylists = async (
  filters: PlayListsearchFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Yt_Playlist[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: PlayListSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditions: Prisma.Yt_PlaylistWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.yt_Playlist.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {},
  });
  const total = await prisma.yt_Playlist.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const GetSinglePlaylist = async (id: string): Promise<Yt_Playlist | null> => {
  const result = await prisma.yt_Playlist.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const PlayListService = {
  CreatePlayList,
  GetAllPlaylists,
  GetSinglePlaylist,
};
