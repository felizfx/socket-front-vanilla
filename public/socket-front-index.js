import { addUsers, deleteDocument, insertDocument, setOffline, setOnline } from "./index.js";
import { getCookie, defineCookies } from "./utils/cookies.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:8000/start", {
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

socket.on("document:created", (document) => {
	insertDocument(document.name);
});       

socket.on("document:deleted", (name) => {
	deleteDocument(name);
});       

socket.on("user:all-users", (userList, usersLogged) => {
	userList.forEach((user) => {
		addUsers(user);
	});
	usersLogged.forEach((user) => {
		setOnline(user);
	});
});

socket.on("user:verified-user", (user) => {
	defineCookies("user", JSON.stringify(user));
	socket.emit("user:logging", user);
});

socket.on("user:logged", (user) => {
	console.log("ola");
	setOnline(user);
});

socket.on("user:offline", (user) => {
	setOffline(user);
});

export function getDocumets(){
	socket.emit("documents:get-all", (documents) => {
		documents.forEach(document => {
			insertDocument(document["name"]);
		});
	});    
}

export function createDocument(name) {
	socket.emit("document:create", name);
}