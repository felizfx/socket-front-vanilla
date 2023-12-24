import { getCookie } from "../utils/cookies.js";
import { emitMessage, room } from "./socket-front-chat.js";

const params = new URLSearchParams(window.location.search);
export const userid = params.get("user");
export const username = params.get("name");

const chatBox = document.getElementById("chat-box");
const title = document.getElementById("username");
const forms = document.getElementById("form-send-message");
const input = document.getElementById("input-documento");

title.innerHTML = username;

forms.addEventListener("submit", (e) => {
	e.preventDefault();
	emitMessage(JSON.parse(getCookie("user")), room, input.value);
	input.value = "";
});

export function addMessage(txt, user) {
	chatBox.innerHTML += `
    <div class="message">
        <span class="sender">${user}</span>
        <p>${txt}</p>
    </div>`;
}