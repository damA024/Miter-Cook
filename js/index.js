const nav = document.querySelector("nav");
const allH1Elements = document.querySelectorAll("h1");
const logo = document.querySelector("#logo");
const liservices = document.querySelector("#liservices");
const idee1_ouvert = document.querySelector("#idee1");
const idee2 = document.querySelector("#idee2");
const services = document.querySelectorAll("#services");
const misterCook = document.querySelector("#mister-cook");
const ping = document.getElementById("ping");

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

      ping.style.top = "-50px";
      idee1.style.top = "-50px";
      idee1.style.opacity = "0";
      idee2.style.top = "50px";
      services.forEach((service) => {
        service.style.height = "50px";
      });
      if (window.innerWidth > 1450) {
      }
      if (window.innerWidth < 1450) {
        liservices.style.top = "-200px";
        services.forEach((service) => {
          service.style.height = "40px";
        });
      }

      // Réinitialiser l'état de la transition
      isTransitionCompleted = true;
    } else {
      nav.style.top = "-95px";
      nav.style.borderRadius = "0 0 55px 55px";
      mc.style.top = "-60px";
      misterCook.style.top = "-150px";
      liservices.style.top = "55px";

      ping.style.top = "100px";
      idee1.style.top = "90px";
      idee2.style.top = "-70px";
      services.forEach((service) => {
        service.style.height = "40px";
      });
      if (window.innerWidth > 1450) {
      }
      if (window.innerWidth < 1450) {
      }

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

import { observer } from "/observer.js";
const targets = document.querySelectorAll("[class^='invisible_']");
observer(targets);

//------------------------------------------------------------------------------------------------

import { carrousel } from "/carrousel.js";
carrousel();

//------------------------------------------------------------------------------------------------

import { menuResponsive } from "/menu-responsive.js";
menuResponsive();

//------------------------------------------------------------------------------------------------

import { commentaires } from "/commentaires.js";
commentaires();

//------------------------------------------------------------------------------------------------

import { input } from "/input.js";
input();

//eviter le bug bizarre du scrollX
window.addEventListener("scroll", () => {
  if (window.scrollX > 1) {
    document.querySelector("body").style.overflowX = "visible";
  } else if (window.scrollX == 0) {
    document.querySelector("body").style.overflowX = "hidden";
  }
});
