const os = require('os');
const pty = require('node-pty');
const {io} = require("./createSocketServer");

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const termProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
});

function spawnShell(){

    return pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

}

// Output From the terminal
termProcess.onData((data) => {
    console.log("Sending Data to output", data);

    io.emit("command-output", data);
    process.stdout.write(data);
});


module.exports.termProcess = termProcess;
module.exports.spawnShell = spawnShell;