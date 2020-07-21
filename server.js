const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const userRouter = require('./routes/user-router');
const authRouter = require('./routes/auth-router');
const db = require('./data/dbConfig.js');
const authenticate = require('./models/authenticate');

const server = express();

const sessionConfiguration = {
    name: "cookie", 
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: process.env.USE_SECURE_COOKIES || false,
        httpOnly: true, 
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: db,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 30, 
    }),
};

server.use(session(sessionConfiguration));
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('api/users', authenticate, userRouter);
server.use('api/auth', authRouter);

module.exports = server;
