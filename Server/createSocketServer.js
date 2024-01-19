const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const FRONTEND_PORT = 63342;

const io = new Server(server, {cors: {
        origin: `http://localhost:${FRONTEND_PORT}`  // Change Frontend Port For CORS Problem
    }});

function startServer(portNumber) {
    const PORT = process.env.PORT || portNumber || 3000;
    server.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}

module.exports.server = server;
module.exports.io = io;
module.exports.app = app;
module.exports.startServer = startServer;
