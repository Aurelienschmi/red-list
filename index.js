const express = require("express");
const app = express();
const port = 3000;

// Configuration du moteur de template EJS
app.set("view engine", "ejs");

// Route pour afficher index.ejs
app.get("/", (req, res) => {
    res.render("index"); // Pas besoin d'écrire ".ejs", c'est automatique
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});