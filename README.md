#back-end express

const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200', // Consentire solo richieste da questo dominio
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const deepLTranslateUrl =  'https://api-free.deepl.com/v2/translate';
const deepLAuthKey = process.env.DEEPL_AUTH_KEY;
const nasaApiKey = process.env.NASA_API_KEY;

app.post('/translate', async (req, res) => {
  const { text, target_lang } = req.body;

  const payload = {
    text: [text],
    target_lang: target_lang
  };

  const headers = {
    'Authorization': `DeepL-Auth-Key ${deepLAuthKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.post(deepLTranslateUrl, payload, { headers });
    res.json(response.data);
  } catch (error) {
    console.error('Errore durante la traduzione:', error);
    res.status(500).json({ error: 'Errore interno del server' });
  }
});


app.get('/nasa-image', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: { api_key: nasaApiKey } // Utilizza la chiave API della NASA come parametro
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





# AppNasa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
