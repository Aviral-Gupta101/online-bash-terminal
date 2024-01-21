const socket = io()
const term = new Terminal();

socket.on("command-output", (data) => {
    term.write(data);
});

term.open(document.getElementById('terminal'));
term.onData((data) => {
    // console.log("emit: ", data)
    // term.write(data);
    socket.emit("execute-command", data);
});