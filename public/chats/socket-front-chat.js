import { defineCookies, getCookie } from "../utils/cookies.js";
import keepNumbersOnly from "../utils/keepNumbers.js";
import { addMessage, userid } from "./chats.js";

export var room = 0;

// eslint-disable-next-line no-undef
const socket = io("https://express-api-socket.onrender.com/chats", {
	auth: {
		token: getCookie("token")
	}
});

socket.on("user:verified-user", user => {
	room = keepNumbersOnly(userid) + keepNumbersOnly(user.id);
	defineCookies("user", JSON.stringify(user));
	emitRoom(room);
	getMessages(room);
});

socket.on("chats:reciving-message", (message, author) => {
	addMessage(message, author);
});

socket.on("connect_error", (error) => {
	window.alert(error.message);
	window.location.href = "/login/index.html";
});

export function emitRoom(name) {
	socket.emit("chats:emit-room", name);
}

export function getMessages(room) {
	socket.emit("chats:get-messages", room, (messageList) => {
		messageList.forEach((message) => {
			addMessage(message.message, message.author);
		});
	});
}

export function emitMessage(author, receiver, message) {
	socket.emit("chats:send-message", author, receiver, message, room);
}

export default socket;