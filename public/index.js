import { createDocument, getDocumets } from "./socket-front-index.js";

const documentsList = document.getElementById("lista-documentos");
const inputInsertDocument = document.getElementById("input-documento");
const btnForms = document.getElementById("send-forms");

getDocumets();

btnForms.addEventListener("click", (e) => {
	e.preventDefault();
	if(inputInsertDocument.value.length != 0) {
		console.log("vazio");
		createDocument(inputInsertDocument.value);
		inputInsertDocument.value = "";
		return;
	}
	window.alert("insira um valor");
});

export function insertDocument(name) {
	documentsList.innerHTML += `<a href="documento.html?nome=${name}" class="list-group-item list-group-item-action" id="document-${name}">
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