const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const projectsRouter = require('./Routes/projects.js');
const actionsRouter = require('./Routes/actions.js');




//middleware
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(morgan());

//routes
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    Server is Running...endpoints @ /api/projects and /api/actions
    `)
});

//exports
module.exports = server;