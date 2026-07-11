import { login } from "/login.js";

export function signup() {
  document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault(); // empecher le rechargement de la page

    const username = document.getElementById("username-signup").value;
    const pw = document.getElementById("pw-signup").value;
    const pw2 = document.getElementById("pw2-signup").value;
    const phone = document.getElementById("phone-signup").value;

    if (pw !== pw2) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, pw, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          login(username, pw);
        } else {
          alert("Erreur lors de l'inscription : " + data.message);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de l'inscription :", error);
        alert("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
      });
  });
}
