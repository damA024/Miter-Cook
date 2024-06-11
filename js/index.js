import { nav } from "/nav.js";
nav();

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
if (window.innerWidth > 600) {
  window.addEventListener("scroll", () => {
    if (window.scrollX > 1) {
      document.querySelector("body").style.overflowX = "visible";
    } else if (window.scrollX == 0) {
      document.querySelector("body").style.overflowX = "hidden";
    }
  });
}

//sur mobile aussi
document.addEventListener(
  "touchmove",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);
window.addEventListener("scroll", function () {
  if (window.scrollX !== 0) {
    window.scrollTo(0, window.scrollY);
  }
});
