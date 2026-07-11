const express = require("express");
const { readFile, writeFile } = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "maptiteclesecrete92";

const basePath = "/MisterCook";
// Middleware pour servir les fichiers statiques depuis le répertoire "public"
app.use(express.static(path.join(__dirname, "MisterCook")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "img")));

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

//---------------------------------------------------------------------------------------------------

// Créez un pool de connexions à la base de données
const pool = mysql.createPool({
  host: "localhost",
  user: "mistercook",
  database: "mistercookdata",
  password: "Miserc00kBD",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Route pour enregistrer un utilisateur
app.post("/register", async (req, res) => {
  const { username, pw, phone } = req.body;

  // Hachage du mot de passe (utiliser bcrypt pour plus de sécurité)
  const hashedPassword = await bcrypt.hash(pw, 10);

  const sql = "INSERT INTO users (username, phone, password) VALUES (?, ?, ?)";
  pool.query(sql, [username, phone, hashedPassword], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'insertion des données :", err);
      res
        .status(500)
        .json({ success: false, message: "Erreur lors de l'inscription." });
      return;
    }
    console.log("Données insérées avec succès.");
    res.status(200).json({ success: true, message: "Inscription réussie." });
  });
});

// Route pour se connecter
app.post("/login", (req, res) => {
  const { username, pw } = req.body;

  if (!username || !pw) {
    return res
      .status(400)
      .json({ success: false, message: "Tous les champs sont requis." });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  pool.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Erreur lors de la recherche de l'utilisateur :", err);
      res
        .status(500)
        .json({ success: false, message: "Erreur lors de la connexion." });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect.",
      });
      return;
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(pw, user.password);
      if (!isMatch) {
        res.status(401).json({
          success: false,
          message: "Nom d'utilisateur ou mot de passe incorrect.",
        });
        return;
      }

      // Générer un jeton JWT
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({ success: true, message: "Connexion réussie.", token });
    } catch (error) {
      console.error("Erreur lors de la comparaison des mots de passe :", error);
      res
        .status(500)
        .json({ success: false, message: "Erreur lors de la connexion." });
    }
  });
});

// Route protégée par JWT
app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Accès refusé. Token manquant ou invalide.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res
      .status(200)
      .json({ success: true, message: "Accès autorisé.", user: decoded });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Accès refusé. Token manquant ou invalide.",
    });
  }
});

//---------------------------------------------------------------------------------------------------

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
