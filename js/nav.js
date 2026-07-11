export function nav() {
  const nav = document.querySelector("nav");
  const allH1Elements = document.querySelectorAll("h1");
  const logo = document.querySelector("#logo");
  const liservices = document.querySelector("#liservices");
  const idee1_ouvert = document.querySelector("#idee1");
  const idee2 = document.querySelector("#idee2");
  const services = document.querySelectorAll("#services");
  const misterCook = document.querySelector("#mister-cook");
  const ping = document.getElementById("ping");
  const menu = document.getElementById("burger-menu");
  const burgerMenu1 = document.getElementById("burger-menu1");
  const burgerMenu2 = document.getElementById("burger-menu2");

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
        mc.style.display = "block";
        misterCook.style.position = "absolute";
        menu.style.top = "-50px";

        misterCook.style.top = "0px";
        liservices.style.top = "30px";

        ping.style.top = "-50px";
        idee1_ouvert.style.top = "-50px";
        idee1_ouvert.style.opacity = "0";
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
        idee1_ouvert.style.top = "90px";
        idee2.style.top = "-70px";
        services.forEach((service) => {
          service.style.height = "40px";
        });
        if (window.innerWidth > 425) {
          menu.style.top = "103px";
        }
        if (window.innerWidth < 425) {
          menu.style.top = "107px";
        }

        if (isTransitionCompleted) {
          // Délai d'une seconde avant le changement d'opacité
          setTimeout(() => {
            idee1_ouvert.style.opacity = "1";
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

  //BURGER MENU

  menu.addEventListener("click", () => {
    nav.classList.toggle("unfolded");
    misterCook.style.position = "relative";
    allH1Elements.forEach((mc) => {
      mc.style.display = "none";
    });
    if (nav.classList.contains("unfolded")) {
      menu.src = "img/croix.png";
      document.documentElement.style.overflowY = "hidden";
    } else {
      menu.src = "img/menu-burger.png";
      document.documentElement.style.overflowY = "visible";
    }
  });
}

