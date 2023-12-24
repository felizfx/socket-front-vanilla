import { txt, userTexting } from "./documento.js";
import { getCookie } from "../utils/cookies.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:8000/documents", {
	auth: {
		token: getCookie("token")
	}
});

socket.on("connect", () => {
	console.log("server connected");
});

socket.on("connect_error", (error) => {
	window.alert(error.message);
	window.location.href = "/login/index.html";
});

socket.on("disconnect", (reason) => {
	console.log(`server disconnected!
    reason: ${reason}`);
});

socket.on("document:txt-receiving", value => {
	console.log("bah");
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
	socket.emit("document:txt-writing", value, name); 
}

export function emitDelete(name) {
	socket.emit("document:delete", name);
}