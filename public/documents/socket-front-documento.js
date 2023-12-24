import { addUser, documentName, removeUser, txt, userTexting } from "./documento.js";
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
	txt.value = value;
});

socket.on("document:user-writing-out", (value) => {
	userTexting.innerHTML = value;
});

socket.on("document:current-deleted", () => {
	return window.location.href = "/";
});

socket.on("user:verified-user", (user) => {
	emitRoom(documentName, user);
});

socket.on("document:user-connected", (listUsers) => {
	addUser(listUsers);
});

socket.on("document:user-disconnected", (name) => {
	removeUser(name);
});

export function emitRoom (name, user) {
	socket.emit("document:select", name, (value) => {
		txt.value = value;
	});
	socket.emit("document:user-connecting", user, documentName);
}

export function emitText(value, name) {
	socket.emit("document:txt-writing", value, name); 
}

export function emitDelete(name) {
	socket.emit("document:delete", name);
}