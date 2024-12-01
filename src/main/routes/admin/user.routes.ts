import { Router } from 'express';
import { findOneUserController } from '@application/controller/user';

export default (inputRouter: Router): void => {
  const router = Router();

  router.get('/:id', findOneUserController());

  inputRouter.use('/user', router);
};
