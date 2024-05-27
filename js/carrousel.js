export function carrousel() {
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
}
