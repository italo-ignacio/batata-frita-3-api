import { IsNull } from 'typeorm';
import { decode } from 'jsonwebtoken';
import { errorLogger, removeBearer, unauthorized } from '@main/utils';
import { userFindParams } from '@data/search';
import { userRepository } from '@infra/repository';
import type { Controller } from '@domain/protocols';
import type { NextFunction, Request, Response } from 'express';

export const validateAdminMiddleware: Controller =
  // eslint-disable-next-line consistent-return
  () => async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { authorization } = request.headers;

      if (typeof authorization === 'undefined') return unauthorized({ response });

      const accessToken = removeBearer(authorization);

      if (accessToken === null) return unauthorized({ response });

      const decoded = decode(accessToken) as {
        email: string;
        user_id: string;
        email_verified: boolean;
      };

      if (!decoded?.email_verified)
        return unauthorized({
          message: {
            english: 'Use a verified email to login',
            portuguese: ''
          },
          response
        });

      if (decoded.email !== 'italo.felipe.ignacio12@gmail.com') return unauthorized({ response });

      const account = await userRepository.findOne({
        select: userFindParams({ landingPage: false }),
        where: { email: decoded?.email, finishedAt: IsNull(), googleId: decoded.user_id }
      });

      if (account === null) return unauthorized({ response });

      Object.assign(request, { user: account });
      next();
    } catch (error) {
      errorLogger(error);

      return unauthorized({ response });
    }
  };
