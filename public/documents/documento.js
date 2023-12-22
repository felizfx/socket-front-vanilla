import { emitDelete, emitText } from "./socket-front-documento.js";
// import { emitChat } from "../chats/socket-front-chat.js";

const params = new URLSearchParams(window.location.search);
export const documentName = params.get("nome");

const txt = document.getElementById("editor-texto");
const title = document.getElementById("titulo-documento");
const userTexting = document.getElementById("user-texting");
const deleteBtn = document.getElementById("excluir-documento");
const userList = document.getElementById("usuarios-conectados");

// emitindindo eventos
title.textContent = documentName || "No title";

txt.addEventListener("keyup", () => {
	emitText(txt.value, documentName);
});

deleteBtn.addEventListener("click", () => {
	emitDelete(documentName);
	window.alert(`Documento ${documentName} excluido com sucesso`);
	window.location.href = "/";
});

function addUser(list) {
	userList.innerHTML = "";
	list.forEach((value) => {
		userList.innerHTML += `<a href="http://localhost:3000/chats/index.html?user=${value.user.id}&name=${value.user.name}" class="list-group-item list-group-item-action" id="${value.user.id}">${value.user.name}</a>`;
	});
}

function removeUser(username) {
	const user = document.getElementById(`${username}`);
	// userList.removeChild(user);
}

export { txt, userTexting, addUser, removeUser };