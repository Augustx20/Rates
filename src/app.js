import express from 'express';
import { connectMongo } from './utils/connection.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import error from './routers/error.routes.js';
import { usersRouter } from './routers/Users.routes.js';

import path from 'path';
import { __dirname } from './utils/path.js';
import { oandaRouter } from './routers/oanda.routes.js';
import { DayRouter } from './routers/days.routes.js';

const app = express();
const port = 8000;

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
  });

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://augus1726:95vcBa5oidA0kJMx@ratessca0.aro7d1q.mongodb.net/', ttl: 86400 * 7 }),
      secret: 'un-re-secreto',
      resave: true,
      saveUninitialized: true,
    })
  );


//ROUTES
//  app.use('*', error)
app.use('/api/users', usersRouter)
app.use('/api/oanda', oandaRouter)
app.use('/api/days', DayRouter)
  
  