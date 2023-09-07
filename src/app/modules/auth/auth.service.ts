import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { IUserLoginResponse } from './auth.interface';

const CreateUSerwithGoogle = async (
  payload: User
): Promise<IUserLoginResponse> => {
  const existUser = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });
  if (existUser) {
    const { id, role, name, image, email } = existUser;
    const token = jwtHelpers.createToken(
      { id, role, name, image, email },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  } else {
    const newUser = await prisma.user.create({
      data: payload,
    });

    const { id, role, name, image, email } = newUser;
    const token = jwtHelpers.createToken(
      { id, role, name, image, email },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  }
};
export const AuthService = { CreateUSerwithGoogle };
