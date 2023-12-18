import { txt, userTexting } from "./documento.js";

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

socket.on("document:user-writing-out", (value) => {
	userTexting.innerHTML = value;
});

socket.on("document:current-deleted", () => {
	return window.location.href = "/";
});

export function emitRoom (name) {
	socket.emit("document:select", name, (value) => {
		txt.value = value;
	});
}

export function emitText(value, name) {
	socket.emit("txt-writing", value, name); 
}

export function emitDelete(name) {
	socket.emit("document:delete", name);
}