const {app, server, io, startServer, express} = require("./createSocketServer");
const cors = require("cors");
const socketEventHandler = require("./socketEventHandler");
const {join} = require("path");
const path = require("path");

// Handling Cors
app.use(express.static(path.join(__dirname, "/static")));
app.use(cors());


app.get('/', (req, res) => {

    // return res.send("<h1>Home Route Node JS</h1>")
    return res.sendFile(join(__dirname, "/views/index.html"))
});

app.get("/route", (req, res) => {
    app.get(".")
});
socketEventHandler()
startServer()