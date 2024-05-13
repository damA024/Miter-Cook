const express = require("express");
const { readFile, writeFile } = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const basePath = "/MisterCook";
// Middleware pour servir les fichiers statiques depuis le répertoire "public"
app.use(express.static(path.join(__dirname, "MisterCook")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "img")));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

let jsonContent = [];

// Endpoint pour récupérer les commentaires
app.get("/commentaires", (req, res) => {
  // Lire le contenu du fichier JSON de manière asynchrone
  readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur lors de la lecture du fichier JSON :", err);
      res.status(500).send("Erreur lors de la récupération des commentaires");
      return;
    }

    try {
      // Convertir le contenu JSON en objet JavaScript
      jsonContent = JSON.parse(data);
      // Envoyer les commentaires en tant que réponse
      res.json(jsonContent);
      res.end();
    } catch (error) {
      console.error(
        "Erreur lors de la conversion du JSON en objet JavaScript :",
        error
      );
      res.status(500).send("Erreur lors de la récupération des commentaires");
    }
  });
});

// Route pour la racine de votre site
app.get("/", (req, res) => {
  // Renvoyer le fichier HTML contenant le formulaire
  res.sendFile(path.join(__dirname, "index.html"));
});

// Route pour enregistrer un commentaire dans un fichier JSON
app.post("/enregistrer-commentaire", (req, res) => {
  // Récupérer les données du corps de la requête
  console.log(jsonContent);
  jsonContent.push(req.body);

  // Chemin du fichier JSON
  const filePath = "data.json";

  // Écrire les données dans le fichier JSON de manière asynchrone
  writeFile(filePath, JSON.stringify(jsonContent), (err) => {
    if (err) {
      console.error(
        "Une erreur s'est produite lors de l'écriture dans le fichier JSON :",
        err
      );
      res.status(500).send("Erreur lors de l'enregistrement du commentaire");
      return;
    }
    console.log(
      "Les commentaires ont été écrits dans le fichier JSON avec succès."
    );
    res.status(200).send("Commentaire enregistré avec succès");
    res.end();
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
