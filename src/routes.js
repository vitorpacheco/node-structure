import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import { storeSession } from './app/controllers/sessionsController';
import { storeUser, updateUser } from './app/controllers/usersController';
import { storeFile } from './app/controllers/filesController';
import { indexNotifications, updateNotification } from './app/controllers/notificationsController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', storeSession);
routes.post('/users', storeUser);

routes.use(authMiddleware);

routes.put('/users', updateUser);
routes.post('/files', upload.single('file'), storeFile);
routes.get('/notifications', indexNotifications);
routes.put('/notifications/:id', updateNotification);

export default routes;
