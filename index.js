const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Configuration du moteur de template EJS
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// Route pour afficher index.ejs
app.get("/", async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countries = response.data;
    const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    res.render("index", { countries: sortedCountries });
  } catch (error) {
    res.status(500).send('Error fetching countries');
  }
});

app.get("/country/:country", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY is not defined in the environment variables');
    }

    const response = await axios.get(`https://api.iucnredlist.org/api/v4/countries/${req.params.country}`, {
      headers: {
        Authorization: `${apiKey}`
      }
    });
    console.log(req.params.country); // Log the country code to understand its structure
    const countryData = response.data;
    res.render("country", { country: countryData.country, assessments: countryData.assessments });
  } catch (error) {
    res.status(500).send('Error fetching country');
    console.error(error);
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});