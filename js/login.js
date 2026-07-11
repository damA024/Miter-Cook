import { accessProtectedData } from "/protected.js";

export function login(username, pw) {
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, pw }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        // Stocker le jeton JWT dans le stockage local ou les cookies
        localStorage.setItem("token", data.token);
        accessProtectedData();
      } else {
        alert("Erreur lors de la connexion : " + data.message);
      }
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion :", error);
      alert("Erreur lors de la connexion. Veuillez réessayer plus tard.");
    });
}
