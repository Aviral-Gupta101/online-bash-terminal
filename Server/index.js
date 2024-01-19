const {app, server, io, startServer} = require("./createSocketServer");
const cors = require("cors");
const socketEventHandler = require("./socketEventHandler");
const {join} = require("path");

// Handling Cors
app.use(cors());

app.get('/', (req, res) => {

    // return res.send("<h1>Home Route Node JS</h1>")
    return res.sendFile(join(__dirname, "/views/index.html"))
});

socketEventHandler()
startServer()