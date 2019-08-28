import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import userController from './app/controllers/userController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', userController);

routes.use(authMiddleware);

export default routes;
