import { defineCookies } from "../utils/cookies.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const name = form["input-usuario"].value;
	const email = form["input-email"].value;
	const password = form["input-senha"].value;

	const obj = {
		name, 
		email,
		password,
		role: "user"
	};

	fetch("https://express-api-socket.onrender.com/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(obj)
	})
		.then(response => response.json())
		.then(data => {
			if(data.status == 201) {
				defineCookies("token", data.data.token);
				window.alert("Usuario criado com sucesso");
				window.location.href = "/";
				return;
			}

			var error = new Error("fecth error");
			error.data = data;

			throw error;
		}).catch((e) => {
			console.log(e.message);
			console.log(e.data);
			if("details" in e.data) {
				var str = "";
				e.data.details.forEach((value) => {
					str += value + "\n";
				});
				window.alert(str);
				return;
			}

			window.alert(e.data.message);
		});
});