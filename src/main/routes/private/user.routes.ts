import { Router } from 'express';
import { findMeController } from '@application/controller/user';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/me', findMeController());

  inputRouter.use('/user', router);
};
