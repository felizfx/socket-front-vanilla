import { emitDelete, emitRoom, emitText } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
export const documentName = params.get("nome");

const txt = document.getElementById("editor-texto");
const title = document.getElementById("titulo-documento");
const userTexting = document.getElementById("user-texting");
const deleteBtn = document.getElementById("excluir-documento");

// emitindindo eventos
title.textContent = documentName || "No title";
emitRoom(documentName);

txt.addEventListener("keyup", () => {
	emitText(txt.value, documentName);
});

deleteBtn.addEventListener("click", () => {
	emitDelete(documentName);
	window.alert(`Documento ${documentName} excluido com sucesso`);
	window.location.href = "/";
});
export { txt, userTexting };