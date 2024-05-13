const nav = document.querySelector("nav");
const allH1Elements = document.querySelectorAll("h1");
const logo = document.querySelector("#logo");
const liservices = document.querySelector("#liservices");
const idee1_ouvert = document.querySelector("#idee1");
const idee2 = document.querySelector("#idee2");
const services = document.querySelectorAll("#services");
const misterCook = document.querySelector("#mister-cook");

let isTransitionCompleted = true;

//nous donne l'heure actuel afin de pouvoir dire si le restaurant est ouvert ou non
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes() * 0.6;
  return hours + minutes / 60;
}

let heure = getCurrentTime();
console.log(heure);

if (heure < 11) {
  idee2.style.display = "none";
} else {
  console.log("ouvert");
}

//transformer la barre de nav lors du scroll
window.addEventListener("scroll", () => {
  allH1Elements.forEach((mc) => {
    if (window.scrollY < 30) {
      nav.style.top = "0px";
      nav.style.borderRadius = "0 0 100px 100px";
      mc.style.top = "0";
      misterCook.style.top = "0px";
      liservices.style.top = "30px";
      idee1.style.top = "-50px";
      idee1.style.opacity = "0";
      idee2.style.top = "50px";
      services.forEach((service) => {
        service.style.height = "50px";
      });

      // Réinitialiser l'état de la transition
      isTransitionCompleted = true;
    } else {
      nav.style.top = "-95px";
      nav.style.borderRadius = "0 0 55px 55px";
      mc.style.top = "-60px";
      misterCook.style.top = "-150px";
      liservices.style.top = "55px";
      idee1.style.top = "90px";
      idee2.style.top = "-30px";
      services.forEach((service) => {
        service.style.height = "40px";
      });

      if (isTransitionCompleted) {
        // Délai d'une seconde avant le changement d'opacité
        setTimeout(() => {
          idee1.style.opacity = "1";
        }, 400);

        // Mettre à jour l'état de la transition
        isTransitionCompleted = false;
      }
    }
  });
});

const oui = setInterval(() => {}, 1000);

setTimeout(() => {
  clearInterval(oui);
}, 5000);

function decompte(nb) {
  const eh = setInterval(() => {
    console.log(nb);
    nb--;
    if (nb < 0) {
      clearInterval(eh);
    }
  }, 1000);
}

//------------------------------------------------------------------------------------------------
//apparition au scroll (menu)

const cards = document.querySelectorAll("[class^='card-']");
window.addEventListener("load", () => {
  if (window.innerWidth < 1300) {
    // Si la largeur est inférieure à 1300 pixels on ajoute la classe et on l'observe
    cards.forEach((card) => {
      card.classList.add("invisible_b");
      observer.observe(card);
    });
  } else {
    // Sinon, supprimez la classe
    cards.forEach((card) => {
      card.classList.remove("invisible_b");
    });
  }
});

//cette partie sert à faire apparaitre les elements ciblés lors du scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
    } else {
      entry.target.classList.remove("invisible_b");
      entry.target.classList.remove("invisible_l");
      entry.target.classList.remove("invisible_r");
      entry.target.style.transition = "0.6s";
    }
  });
});
const targets = document.querySelectorAll("[class^='invisible_']");
for (const target of targets) {
  observer.observe(target);
}

//CARROUSEL

// enferme les boutons "prev" et "next" dans une constante "btns"
const btns = document.querySelectorAll(".caroussel_btn");

// crée une variable booléen "canClick" qu'on utilisera pour créer un délai entre chaque changement de slide pour que l'utilisateur ne puisse pas spam et ainsi eviter des bug
let canClick = true;

//pour chaque boutons de la constante "btns" (donc 2) on va appliquer cette fonction qui prend en parametre "btn", soit le bouton sur lequel on a cliqué
btns.forEach((btn) => {
  //ici on ajoute un évenement lorsque on clique sur un des boutons en prenant en parametre l'evenement "e", il nous permettra de savoir si on clique sur le bouton "next" ou "prev"
  btn.addEventListener("click", (e) => {
    if (canClick) {
      canClick = false;
      //il faut absolument déclarer ces constante à l'interieur de la fonction pour qu'elles soit reset a chaque nouveau clique
      //sinon a chaque clique la slide 1 devient la slide 2 ou inversement etc...
      const slide0 = document.querySelector(".slide_0");
      const slide1 = document.querySelector(".slide_1");
      const slide2 = document.querySelector(".slide_2");
      const slide3 = document.querySelector(".slide_3");
      const slide4 = document.querySelector(".slide_4");
      const slide5 = document.querySelector(".slide_5");

      //récupere l'id du bouton sur lequel on clique
      if (e.target.id == "prev") {
        //la slide 1 devient slide 2, la slide 0 devient slide 1 etc...
        slide1.classList.remove("slide_1");
        slide1.classList.add("slide_2");

        slide0.classList.remove("slide_0");
        slide0.classList.add("slide_1");

        slide2.style.transform = "translateX(3140px)";

        //ici setTimeout sert à empecher un bug
        setTimeout(() => {
          slide2.classList.remove("slide_2");
          slide2.classList.add("slide_3");
          slide2.style.transform = "";
        }, 1000);

        slide4.style.display = "block";
        slide4.classList.remove("slide_4");
        slide4.classList.add("slide_5");

        slide3.classList.remove("slide_3");
        slide3.classList.add("slide_4");

        slide5.classList.remove("slide_5");
        slide5.classList.add("slide_0");
      }

      //le même evenement mais cette fois lorsqu'on clique sur le bouton next
      else {
        slide1.classList.remove("slide_1");
        slide1.classList.add("slide_0");

        slide2.classList.remove("slide_2");
        slide2.classList.add("slide_1");

        slide0.style.transform = "translateX(-3140px)";
        setTimeout(() => {
          slide0.classList.remove("slide_0");
          slide0.classList.add("slide_5");
          slide0.style.transform = "";
        }, 1000);

        slide3.style.display = "block";
        slide3.classList.remove("slide_3");
        slide3.classList.add("slide_2");

        slide4.classList.remove("slide_4");
        slide4.classList.add("slide_3");

        slide5.classList.remove("slide_5");
        slide5.classList.add("slide_4");
      }

      setTimeout(() => {
        canClick = true;
      }, 1000);
    }
  });
});

//------------------------------------------------------------------------------------------------

//pour déployer et replier les menus en mode responsive

const menus = document.querySelectorAll(".menu");
console.log(menus);

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
  } else {
    menu.firstElementChild.lastElementChild.remove();
  }
});

//------------------------------------------------------------------------------------------------

// COMMENTAIRES OMG

document
  .getElementById("com-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const comContent = document.getElementById("input-text").value;
    const comName = prompt("donne ton nom");
    try {
      const response = await fetch(
        "http://localhost:3000/enregistrer-commentaire",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: comName,
            commentaire: comContent,
            verified: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du commentaire");
      }

      console.log("Commentaire enregistré avec succès");
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du commentaire :",
        error.message
      );
    }
  });

const moreCom = document.getElementById("more-com");

fetch("/commentaires")
  .then((resposnse) => {
    if (!resposnse.ok) {
      throw new Error("Erreur lors de la récupération des commentaires");
    }
    return resposnse.json();
  })
  .then((commentaires) => {
    // Afficher les commentaires sur la page
    afficherCommentaires(commentaires);

    moreCom.addEventListener("click", () => {
      afficherCommentaires(commentaires);
    });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des commentaires :", error);
  });

// Fonction pour afficher les commentaires sur la page
let a = 0;
let newCom = 0;
function afficherCommentaires(comments) {
  comments.forEach((comData) => {
    if (comData.verified == false) {
      newCom++;
    }
  });
  const comList = document.getElementById("com-container");
  for (let i = a; i < a + 5 && i < comments.length; i++) {
    const comData = comments[i];
    if (comData.verified == true) {
      const li = document.createElement("li");
      const h5 = document.createElement("h5");
      const p = document.createElement("p");
      h5.textContent = comData.nom;
      p.textContent = comData.commentaire;
      li.append(h5);
      li.append(p);
      comList.append(li);
    }
    if (i + 1 == comments.length - newCom) {
      moreCom.remove();
    }
  }
  a = a + 5;
}

//-------------------------------------------------------------------------------------

const inputText = document.getElementById("input-text");
const comRemove = document.getElementById("com-remove");
const inputSubmit = document.getElementById("input-submit");

comRemove.addEventListener("click", () => {
  comRemove.style.transition = "0s";
  inputSubmit.style.transition = "0s";
  inputText.value = "";
  comRemove.style.visibility = "hidden";
  inputSubmit.style.visibility = "hidden";
  comRemove.classList.add("invisible_button");
  inputSubmit.classList.add("invisible_button");
});
inputText.addEventListener("focus", () => {
  comRemove.style.visibility = "visible";
  inputSubmit.style.visibility = "visible";
  comRemove.style.transition = "0.6s";
  inputSubmit.style.transition = "0.6s";
  comRemove.classList.remove("invisible_button");
  inputSubmit.classList.remove("invisible_button");
});
