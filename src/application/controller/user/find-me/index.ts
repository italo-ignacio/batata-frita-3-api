import { landingPageRepository } from '@infra/repository';
import { messageErrorResponse, ok } from '@main/utils';
import type { Controller } from '@domain/protocols';
import type { Request, Response } from 'express';

/**
 * @typedef {object} FindOneUserResponse
 * @property {Messages} message
 * @property {string} status
 * @property {User} payload
 */

/**
 * GET /user/me
 * @summary Find me
 * @tags User
 * @security BearerAuth
 * @param {string} id.path.required
 * @return {FindOneUserResponse} 200 - Successful response - application/json
 * @return {BadRequestResponse} 400 - Bad request response - application/json
 * @return {UnauthorizedResponse} 401 - Unauthorized response - application/json
 * @return {NotFoundRequest} 404 - Not found response - application/json
 */
export const findMeController: Controller = () => async (request: Request, response: Response) => {
  try {
    const payload = await landingPageRepository.find({
      select: { handle: true, id: true, published: true, title: true },
      where: [{ user: { id: request.user.id } }]
    });

    return ok({ payload: { ...request.user, landingPage: payload ?? [] }, response });
  } catch (error) {
    return messageErrorResponse({ error, response });
  }
};
