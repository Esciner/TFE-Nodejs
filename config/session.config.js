const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');

// Une sessions dure 14 jours (maxAge du cookie = ttl de session)
app.use(session({
  secret: 'uw0sXujULyqKL0tU1m9TghER4BQGMcnV',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 24 * 14
  },
  store: MongoStore.create({
    clientPromise: clientPromise.then((m) => m.connection.getClient()),
    ttl: 60 * 60 * 24 * 14,
  }),
}));