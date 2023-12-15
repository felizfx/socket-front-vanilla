import { emitSection, emitText } from "./socket-front.js";

const params = new URLSearchParams(window.location.search);
const documentName = params.get("nome");

const txt = document.getElementById("editor-texto");
const title = document.getElementById("titulo-documento");

title.textContent = documentName || "No title";

// emitindindo eventos
emitSection(documentName);

txt.addEventListener("keyup", () => {
	emitText(txt.value, documentName);
});

export { txt };