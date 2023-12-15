import { txt } from "./script.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:8000");

socket.on("connect", () => {
	console.log("server connected");
});

socket.on("disconnect", (reason) => {
	console.log(`server disconnected!
    reason: ${reason}`);
});

socket.on("txt-receiving", value => {
	txt.value = value;
});

export function emitSection (name) {
	socket.emit("document:select", name);
}

export function emitText(value, name) {
	socket.emit("txt-writing", value, name); 
}