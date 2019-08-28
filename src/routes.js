import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import { storeSession } from './app/controllers/sessionController';
import { storeUser, updateUser } from './app/controllers/userController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', storeSession);
routes.post('/users', storeUser);

routes.use(authMiddleware);

routes.put('/users', updateUser);

export default routes;
