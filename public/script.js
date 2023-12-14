/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const socket = io("http://localhost:8000");

// socket.on("connect", () => {
// 	console.log("achou");
// });

const txt = document.getElementById("editor-texto");

txt.addEventListener("keyup", () => {
	socket.emit("txt-writing", txt.value);
});