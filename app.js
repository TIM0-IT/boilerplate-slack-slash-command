"use strict";
import express      from 'express';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import http         from 'http'

import routeCommand       from './routes/command';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Define the default route
app.get('/', (req, res) => {
    res.status(200).json({message: "Hello World !"});
});

// Example of a random command route
app.use('/command', routeCommand);

app.close = function() {
    server.close();
};

app.listen(() => {
    server.listen(port, () => {
        // app.settings.env is set with the env variable NODE_ENV=production|dev
        console.log("Express server listening on port " + port + " in " + app.settings.env + " mode");
    });
});

export default app;