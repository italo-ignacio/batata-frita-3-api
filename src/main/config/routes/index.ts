/* eslint-disable function-paren-newline */
import { Router } from 'express';
import { api } from '@domain/helpers';
import { join } from 'path';
import { readdirSync } from 'fs';
import { validateAdminMiddleware, validateTokenMiddleware } from '@main/middleware/validation';
import type { Express } from 'express';

export const setupRoutes = (app: Express): void => {
  const publicRouter = Router();
  const privateRouter = Router();
  const adminRouter = Router();

  readdirSync(join(__dirname, '..', '..', 'routes', 'public')).map(async (file) =>
    (await import(`../../routes/public/${file}`)).default(publicRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'private')).map(async (file) =>
    (await import(`../../routes/private/${file}`)).default(privateRouter)
  );

  readdirSync(join(__dirname, '..', '..', 'routes', 'admin')).map(async (file) =>
    (await import(`../../routes/admin/${file}`)).default(adminRouter)
  );

  app.use(api.baseUrl, publicRouter);
  app.use(api.baseUrl, validateTokenMiddleware(), privateRouter);
  app.use(api.baseUrl, validateAdminMiddleware(), privateRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Api running successfully (◡‿◡)'
    });
  });
};
