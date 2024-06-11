export function input() {
  const inputText = document.getElementById("input-text");
  const comRemove = document.getElementById("com-remove");
  const inputSubmit = document.getElementById("com-submit");

  comRemove.addEventListener("click", () => {
    comRemove.style.transition = "0s";
    inputSubmit.style.transition = "0s";
    inputText.value = "";
    comRemove.style.visibility = "hidden";
    inputSubmit.style.visibility = "hidden";
    comRemove.classList.add("anim_button");
    inputSubmit.classList.add("anim_button");
  });
  inputText.addEventListener("focus", () => {
    comRemove.style.transition = "0.6s";
    inputSubmit.style.transition = "0.6s";
    comRemove.style.visibility = "visible";
    inputSubmit.style.visibility = "visible";
    comRemove.classList.remove("anim_button");
    inputSubmit.classList.remove("anim_button");
  });
}
