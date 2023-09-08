import { PlayList, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { PlayListsearchFields } from './playList.interface';
import { PlayListSearchableFields } from './playlist.constant';

const CreatePlayList = async (payload: PlayList): Promise<PlayList> => {
  const result = await prisma.playList.create({
    data: payload,
  });
  return result;
};
const GetAllPlaylists = async (
  filters: PlayListsearchFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<PlayList[]>> => {
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
  const whereConditions: Prisma.PlayListWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.playList.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {},
  });
  const total = await prisma.playList.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const GetSinglePlaylist = async (id: string): Promise<PlayList | null> => {
  const result = await prisma.playList.findUnique({
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
