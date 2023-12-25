import { createDocument, getDocumets } from "./socket-front-index.js";
import { deleteCookie } from "./utils/cookies.js";

const documentsList = document.getElementById("lista-documentos");
const inputInsertDocument = document.getElementById("input-documento");
const forms = document.getElementById("form-adiciona-documento");
const btnLogout = document.getElementById("botao-logout");
const userList = document.getElementById("usuarios-conectados");

getDocumets();

forms.addEventListener("submit", (e) => {
	e.preventDefault();
	if(inputInsertDocument.value.length != 0) {
		const doc = document.getElementById(`document-${inputInsertDocument.value}`);

		if(!doc) {
			createDocument(inputInsertDocument.value);
			inputInsertDocument.value = "";
			return;
		}

		window.alert("documento ja existente");
		return;
	}
	window.alert("insira um valor");
});

btnLogout.addEventListener("click", () => {
	deleteCookie("token");
	window.location.href = "login/index.html";
});

export function insertDocument(name) {
	documentsList.innerHTML += `<a href="documents/index.html?nome=${name}" class="list-group-item list-group-item-action" id="document-${name}">
    ${name}
  </a>`;
}

export function deleteDocument(name) {
	const id = "document-" + String(name);
	const documentDeleted = document.getElementById(id);

	if (documentDeleted) {
		documentsList.removeChild(documentDeleted);
	} else {
		console.log(`Document with ID ${id} not found.`);
	}
}   

export function addUsers(user) {
	let userConneted = `<a href="http://localhost:3000/chats/index.html?user=${user._id}&name=${user.name}" class="list-group-item list-group-item-action" id="${user._id}">
				<p class="txt-margin">${user.name}</p>
				<span class="offline-indicator">offline</span>
			</a>`;
	userList.innerHTML += userConneted;
}

export function setOnline(user) {
	const userLogged = document.getElementById(user.id);
	let span = userLogged.querySelector("span");
	span.className = "online-indicator";
	span.innerHTML = "online";
}

export function setOffline(user) {
	const userLogged = document.getElementById(user.id);
	let span = userLogged.querySelector("span");
	span.className = "offline-indicator";
	span.innerHTML = "offline";
}