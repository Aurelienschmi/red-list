const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

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
        if (name.language === 'fre') acc.french = name.name;
        return acc;
      }, { english: 'N/A', french: 'N/A' });
      return {
        ...assessment,
        scientific_name: speciesData.taxon.scientific_name,
        common_name_english: commonNames.english,
        common_name_french: commonNames.french
      };
    }));

    res.render("country", { country: countryData.country, assessments });
  } catch (error) {
    res.status(500).send('Error fetching country');
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});