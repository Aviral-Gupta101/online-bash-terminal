import {io} from "socket.io-client";
const socket = io("http://localhost:3000",  { transports: ['websocket', 'polling', 'flashsocket'] });

console.log("JS loaded successfully")

function onButtonClick(){
    alert("hello")
    socket.emit("message", "Message Sent");
}