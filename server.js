const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet')
const path = require('path');
const connect = require('./db');
const { recommendCities, listCities, postSurvey } = require('./recommender/controller');

const app = express();
const port = process.env.PORT || 5000;
connect()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())

app.get('/api/recommendations', recommendCities);
app.get('/api/cities', listCities);
app.post('/api/survey', postSurvey);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server started on port: ${port}`));