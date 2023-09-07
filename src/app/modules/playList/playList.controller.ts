import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PlayListService } from './playList.service';
import { PlayListFilterableFields } from './playlist.constant';
import { PlayList } from '@prisma/client';

const CreatePlayList = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await PlayListService.CreatePlayList(data);
  sendResponse<PlayList>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Youtube PlayList created successfully',
    data: result,
  });
});

const GetAllPlaylists = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PlayListFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await PlayListService.GetAllPlaylists(
    filters,
    paginationOptions
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Youtube PlayList retrive successfully',
    meta: result.meta,
    data: result.data,
  });
});
const GetSinglePlaylists = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await PlayListService.GetSinglePlaylist(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Youtube PlayList retrive successfully',
    data: result,
  });
});
export const PlayListController = {
  CreatePlayList,
  GetAllPlaylists,
  GetSinglePlaylists,
};
