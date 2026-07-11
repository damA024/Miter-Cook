import { observer } from "./observer.js";

export function menuResponsive() {
  //pour déployer et replier les menus en mode responsive
  const menus = document.querySelectorAll(".menu");

  menus.forEach((menu) => {
    if (window.innerWidth < 1300) {
      const menuName = menu.firstElementChild;
      const fleche = menuName.lastElementChild;
      let currentHeight;

      menuName.addEventListener("click", () => {
        currentHeight = menu.offsetHeight;
        if (currentHeight < 200) {
          menu.style.height = menu.scrollHeight - 60 + "px";
          fleche.style.transform = "rotate(90deg)";
        } else {
          menu.style.height = "calc(0.7rem + 4vw + 20px)";
          fleche.style.transform = "rotate(0deg)";
        }
      });
    } else {
      menu.firstElementChild.lastElementChild.remove();
    }
  });

  //apparition au scroll
  const cards = document.querySelectorAll("[class^='card-']");
  window.addEventListener("load", () => {
    if (window.innerWidth < 1300) {
      // Si la largeur est inférieure à 1300 pixels on ajoute la classe et on l'observe
      cards.forEach((card) => {
        card.classList.add("invisible_b");
      });
      observer(cards);

      //Pour les assietes
      document.getElementById("assiettes").src = "img/assiettes-responsive.jpg";
      document.getElementById("tacos").src = "img/tacos-responsive.jpg";
      document.getElementById("desserts").src = "img/desserts-responsive.jpg";
    } else {
      // Sinon, supprimez la classe
      cards.forEach((card) => {
        card.classList.remove("invisible_b");
      });
    }
  });
}

// pourquoi ca marche pas ???
/*
menus.forEach((menu) => {
    if (window.innerWidth < 1300) {
      const menuName = menu.firstElementChild;
      const fleche = menuName.lastElementChild;

      let currentHeight;
      const contentHeight = menu.scrollHeight - 50 + 15;
      menuName.addEventListener("click", () => {
        currentHeight = menu.offsetHeight;
        if (currentHeight < 200) {
          menu.style.height = contentHeight + "px";
          fleche.style.transform = "rotate(90deg)";
        } else {
          menu.style.height = "calc(0.7rem + 4vw + 20px)";
          fleche.style.transform = "rotate(0deg)";
        }
      });
      */
