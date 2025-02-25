const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const NodeCache = require("node-cache");

dotenv.config();

const app = express();
const port = 80;
const cache = new NodeCache({ stdTTL: 3600 });

app.set("view engine", "ejs");
app.set('views', __dirname);

app.use(express.static('public'));

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
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${req.params.country}`);
    const countryData = response.data[0];

    res.render("country", { country: countryData });
  } catch (error) {
    res.status(500).send('Error fetching country');
    console.error(error);
  }
});

app.get("/country/:country/endangered", async (req, res) => {
  try {
    const country = req.params.country;
    const cachedData = cache.get(country);

    if (cachedData) {
      return res.render("endangered", { country: cachedData.country.name.common, assessments: cachedData.assessments });
    }

    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error('API_KEY is not defined in the environment variables');
    }
    const response = await axios.get(`https://api.iucnredlist.org/api/v4/countries/${country}`, {
      headers: {
        Authorization: `${apiKey}`
      }
    });
    const countryData = response.data;

    // Limit to the first 10 assessments
    const limitedAssessments = countryData.assessments.slice(0, 10);

    // Fetch detailed information for each species
    const assessments = await Promise.all(limitedAssessments.map(async (assessment) => {
      const speciesResponse = await axios.get(`https://api.iucnredlist.org/api/v4/taxa/sis/${assessment.sis_taxon_id}`, {
        headers: {
          Authorization: `${apiKey}`
        }
      });
      const speciesData = speciesResponse.data;
      const commonNames = speciesData.taxon.common_names.reduce((acc, name) => {
        if (name.language === 'eng') acc.english = name.name;
        if (name.language === 'fra') acc.french = name.name;
        return acc;
      }, { english: 'N/A', french: 'N/A' });
      return {
        ...assessment,
        scientific_name: speciesData.taxon.scientific_name,
        common_name_english: commonNames.english,
        common_name_french: commonNames.french
      };
    }));

    // Cache the data
    cache.set(country, { country: { name: { common: country } }, assessments });

    res.render("endangered", { country: country, assessments });
  } catch (error) {
    res.status(500).send('Error fetching endangered species');
    console.error(error);
  }
});

// Redirect invalid URLs to the base URL
app.use((req, res) => {
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});