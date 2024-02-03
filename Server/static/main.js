let socket = null;
const term = new Terminal({cursorBlink: true});

const successAlert = document.getElementById("alert-success");
const dangerAlert = document.getElementById("alert-danger");
const stopButton = document.getElementById("stop-button");
const startButton = document.getElementById("start-button");
const timer = document.getElementById("timer");

function restartTimer(){
    timer.innerText = "10:00";
}
function toggleStartButton(isOn){

    const maxTime = 1000 * 60 * 10;
    const startTime = Date.now();
    const endTime = startTime + maxTime;

    setTimeout(() => {
        handleStop();
    }, maxTime);

    function updateTimer(endTime) {

        let currentTime = Date.now();
        let remainingTime = endTime - currentTime;

        if (remainingTime <= 0) {
            // Timer has expired
            restartTimer();
            console.log("Timer expired!");
            if(timeInterval)
                clearInterval(timeInterval);
        } else {

            // Convert remaining time to minutes and seconds
            let minutes = Math.floor(remainingTime / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            if (minutes.toString().length === 1)
                minutes = "0" + minutes.toString();
            if (seconds.toString().length === 1)
                seconds = "0" + seconds.toString();

            timer.innerText = minutes + ":" + seconds;
            console.log("Time Remaining: " + minutes + " minutes " + seconds + " seconds");
        }
    }

    let timeInterval = null;

    if(isOn === undefined || isOn === null){
        console.log("isOn is undefined");
    }
    else if(isOn === true){
        startButton.classList.remove("disabled");

    }
    else if(isOn === false){
        startButton.classList.add("disabled");
        timeInterval = setInterval(() => {updateTimer(endTime)}, 1000);
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