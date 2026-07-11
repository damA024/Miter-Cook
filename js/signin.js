import { login } from "./login.js";

export async function signin() {
  document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault(); // empecher le rechargement de la page

    const username = document.getElementById("username-login").value;
    const pw = document.getElementById("pw-login").value;

    login(username, pw);
  });
}
