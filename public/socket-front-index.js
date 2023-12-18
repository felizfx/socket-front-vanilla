import { deleteDocument, insertDocument } from "./index.js";

// eslint-disable-next-line no-undef
const socket = io("http://localhost:8000");

socket.on("connect", () => {
	console.log("server connected");
});

socket.on("document:created", (document) => {
	insertDocument(document.name);
});       

socket.on("document:deleted", (name) => {
	deleteDocument(name);
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