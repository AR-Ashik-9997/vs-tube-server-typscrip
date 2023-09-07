import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';
import { IUserLoginResponse } from './auth.interface';

const CreateUSerwithGoogle = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AuthService.CreateUSerwithGoogle(data);
  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

export const AuthController = { CreateUSerwithGoogle };
