import { defineCookies } from "../utils/cookies.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = form["input-email"].value;
	const password = form["input-senha"].value;

	fetch("http://localhost:8000/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email,
			password
		})
	})
		.then(response => response.json())
		.then(data => {
			if(data.status == 200) {
				defineCookies("token", data.data.token);
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