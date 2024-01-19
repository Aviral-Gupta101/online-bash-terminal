const {io} = require("./createSocketServer");
const {termProcess, spawnShell} = require("./node-pty");

let users = {}
function socketEventHandler(){

    io.on("connection", (socket) => {
        // console.log("Connected", socket.id)

        users[socket.id] = spawnShell()
        console.log("Process Created:", users[socket.id].pid)

        users[socket.id].on("exit", (code, signal) => {
            console.log("Disconnect EXIT CODE");

            if(users[socket.id]) {
                console.log(`Process:${users[socket.id].pid} Exited`);
                users[socket.id].kill();
            }
            socket.disconnect();
            delete users[socket.id];
        });

        users[socket.id].onData((data) => {

            socket.emit("command-output", data);
            process.stdout.write(data);
        });

        // Handle input from Web Terminal
        socket.on("execute-command", (data) => {
            // console.log("Data Received ****", data, "****");
            users[socket.id].write(data);
        });

        socket.on("disconnect", () => {
            console.log("Disconnect SOCKET CONN");
            console.log(`Process:${users[socket.id].pid} Exited`);
            users[socket.id].kill();
            socket.disconnect();
            delete users[socket.id];
        });

    });
}

module.exports = socketEventHandler;


