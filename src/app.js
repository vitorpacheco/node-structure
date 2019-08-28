import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import Youch from 'youch';

import routes from './routes';

const middlewares = (server) => server
  .use(cors())
  .use(express.json())
  .use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
  );

const router = (server) => server.use(routes);

const exceptionHandler = (server) => server.use(async (err, req, res, next) => {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    const errors = await new Youch(err, req).toJSON();

    return res.status(500).json(errors);
  }

  return res.status(500).json({ error: 'Internal server error' });
});

const App = () => exceptionHandler(
  router(
    middlewares(
      express()
    )
  )
);

export default App;
