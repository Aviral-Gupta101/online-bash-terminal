const socket = io("http://localhost:3000")
const term = new Terminal();

socket.on("command-output", (data) => {
    term.write(data);
});
