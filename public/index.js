import { createDocument, getDocumets } from "./socket-front-index.js";
import { deleteCookie } from "./utils/cookies.js";

const documentsList = document.getElementById("lista-documentos");
const inputInsertDocument = document.getElementById("input-documento");
const forms = document.getElementById("form-adiciona-documento");
const btnLogout = document.getElementById("botao-logout");

getDocumets();

forms.addEventListener("submit", (e) => {
	e.preventDefault();
	createDocument(inputInsertDocument.value);
	inputInsertDocument.value = "";
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