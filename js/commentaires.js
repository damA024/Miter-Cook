import { observer } from "/observer.js";

export function commentaires() {
  // COMMENTAIRES OMG

  const popup = document.getElementById("popup");
  const body = document.querySelector("body");

  function recupererNom() {
    return new Promise((resolve) => {
      const error = document.getElementById("error-name");
      const textError =
        document.getElementById("error-name").firstElementChild
          .firstElementChild;
      // Affiche le popup
      popup.classList.add("active");
      body.classList.add("no-scroll");
      document.getElementById("close-popup").addEventListener("click", () => {
        popup.classList.remove("active");
        body.classList.remove("no-scroll");
      });

      // Ajoute un gestionnaire d'événements pour la soumission du formulaire
      document.getElementById("name-form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Récupère la valeur saisie dans le champ input
        const comName = document.getElementById("name-input").value.trim();

        if (comName.length < 3) {
          error.classList.add("active");
          textError.textContent = "Le nom indiqué est trop court";
          return; // Sortir de l'événement si le commentaire est vide
        } else if (comName.length > 30) {
          textError.textContent = "Le nom indiqué est trop long";
          return; // Sortir de l'événement si nom est trop court
        }
        error.classList.remove("active");

        // Résout la promesse avec la valeur saisie
        resolve(comName);
      });
    });
  }

  //-------------------------------------------------------------------------------

  async function envoyerCom(name, content) {
    try {
      const response = await fetch(
        "http://localhost:3000/enregistrer-commentaire",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom: name,
            commentaire: content,
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
  }

  //-------------------------------------------------------------------------------

  document.getElementById("com-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const comContent = document.getElementById("input-text").value.trim();
    const message1 = document.getElementById("popup-message").firstElementChild;
    const message2 = document.getElementById("popup-message").lastElementChild;
    const error = document.getElementById("error-com");
    const textError =
      document.getElementById("error-com").firstElementChild.firstElementChild;

    if (!comContent) {
      error.classList.add("active");
      textError.textContent =
        "Le contenu du commentaire ne peut pas être vide.";
      return; // Sortir de l'événement si le commentaire est vide
    } else if (comContent.length > 300) {
      error.classList.add("active");
      textError.textContent =
        "Veuillez entrer un commentaire de moins de 300 caractères";
      return; // Sortir de l'événement si le commentaire est vide
    }
    error.classList.remove("active");

    recupererNom()
      .then((comName) => {
        envoyerCom(comName, comContent);
        message1.textContent =
          "Nous avons bien recu votre commentaire, il sera soumis à une vérification avant d'être visible dans l'espace commentaire.";
        message2.textContent = "Merci pour votre retour!";
        document.getElementById("close-popup").addEventListener("click", () => {
          popup.classList.remove("active");
          body.classList.remove("no-scroll");
          document.getElementById("com-form").remove();
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du nom:", error);
      });
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
  function afficherCommentaires(comments) {
    let newCom = 0;
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
        li.classList.add("invisible_com");
        comList.append(li);
      }
      if (i + 1 == comments.length - newCom) {
        moreCom.remove();
      }
    }
    a = a + 5;
    const comAnim = document.querySelectorAll(".invisible_com");
    observer(comAnim);
  }
}
