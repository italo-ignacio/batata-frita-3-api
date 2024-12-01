import { IsNull } from 'typeorm';
import { ValidationError } from 'yup';
import { authenticateSchema } from '@data/validation';
import { decode } from 'jsonwebtoken';
import {
  errorLogger,
  messageErrorResponse,
  ok,
  unauthorized,
  validationErrorResponse
} from '@main/utils';
import { userFindParams } from '@data/search';
import { userRepository } from '@infra/repository';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

interface Body {
  accessToken: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  refreshToken: string;
  googleId: string;
}

/**
 * @typedef {object} LoginBody
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * @typedef {object} LoginPayload
 * @property {string} accessToken.required
 * @property {User} user.required
 */

/**
 * @typedef {object} LoginResponse
 * @property {Messages} message
 * @property {string} status
 * @property {LoginPayload} payload
 */

/**
 * POST /login
 * @summary Login
 * @tags A Auth
 * @example request - payload example
 * {
 *   "email": "support@support",
 *   "password": "123456"
 * }
 * @param {LoginBody} request.body.required - application/json
 * @return {LoginResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 */
export const authenticateController: Controller =
  () => async (request: Request, response: Response) => {
    try {
      await authenticateSchema.validate(request, { abortEarly: false });

      const { email, accessToken, displayName, emailVerified, googleId } = request.body as Body;

      const decoded = decode(accessToken) as {
        email: string;
        user_id: string;
        email_verified: boolean;
      };

      if (!emailVerified || !decoded?.email_verified)
        return unauthorized({
          message: {
            english: 'Use a verified email to login',
            portuguese: ''
          },
          response
        });

      if (email !== decoded?.email || googleId !== decoded?.user_id)
        return unauthorized({ response });

      const user = await userRepository.findOne({
        relations: { landingPage: true },
        select: userFindParams(),
        where: { email, finishedAt: IsNull(), googleId }
      });

      if (!user) {
        const newUser = await userRepository.insert({
          email,
          googleId,
          name: displayName
        });

        const insertedId = newUser.identifiers[0].id;

        const getNewUser = await userRepository.findOne({
          relations: { landingPage: true },
          select: userFindParams(),
          where: { id: insertedId }
        });

        return ok({ payload: { user: getNewUser }, response });
      }

      return ok({ payload: { user }, response });
    } catch (error) {
      errorLogger(error);

      if (error instanceof ValidationError) return validationErrorResponse({ error, response });

      return messageErrorResponse({ error, response });
    }
  };
