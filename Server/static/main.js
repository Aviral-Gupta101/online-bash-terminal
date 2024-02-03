var socket = null;
const term = new Terminal({cursorBlink: true});

const successAlert = document.getElementById("alert-success");
const dangerAlert = document.getElementById("alert-danger");
const stopButton = document.getElementById("stop-button");
const startButton = document.getElementById("start-button");

function toggleStartButton(isOn){

    if(isOn === undefined || isOn === null){
        console.log("isOn is undefined");
    }
    else if(isOn === true){
        startButton.classList.remove("disabled");
    }
    else if(isOn === false){
        startButton.classList.add("disabled");
    }
}

function toggleStopButton(isOn){

    if(isOn === undefined || isOn === null){
        console.log("isOn is undefined");
    }
    else if(isOn === true){
        stopButton.classList.remove("disabled");
    }
    else if(isOn === false){
        stopButton.classList.add("disabled");
    }
}

function showAlert(msg, isWarning){

    if(isWarning === undefined || isWarning === null){
        console.log("No Alert Flag specified !!");
    }

    else if(isWarning === true){

        dangerAlert.innerText = msg
        dangerAlert.classList.remove("d-none");

        setTimeout(() => {
            dangerAlert.classList.add("d-none");
        }, 3000);
    }

    else if(isWarning === false) {

        successAlert.innerText = msg
        successAlert.classList.remove("d-none");

        setTimeout(() => {
            successAlert.classList.add("d-none");
        }, 3000);
    }


}

function handleStart(){

    // Check if already connected
    if(socket)
        showAlert("Terminal Already Running !!!", true);

    else {

        // Show success banner
       showAlert("Terminal Started Successfully !!!", false);

        // Create connection and listen for events
        socket = io();
        socket.on("command-output", (data) => {
            term.write(data);
        });
        // Enable Stop button
        toggleStopButton(true);

    }

    // Disable the start button in any case.
    toggleStartButton(false);
}

function handleStop() {

    // If connected
    if(socket && socket.connected){

        socket.disconnect();
        socket = null;

        showAlert("Terminal Disconnected Successfully !!!", false);

        // Enable start button & disable stop button
        toggleStopButton(false);
        toggleStartButton(true);

    }
    else { // already disconnected

        showAlert("Terminal Not connected !!!", true);
        toggleStopButton(false);
    }
}

term.open(document.getElementById('terminal'));
term.onData((data) => {
    // console.log("emit: ", data)
    // term.write(data);
    if(socket)
        socket.emit("execute-command", data);
});