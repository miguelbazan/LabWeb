const request = require('request');
const credentials = require('./credentials');

function getWeather(latitude, longitude, callback) {
  const darkSkyUrl =
      `https://api.darksky.net/forecast/${credentials.DARK_SKY_SECRET_KEY}/${
          latitude},${longitude}?lang=es&units=si`;

  request(darkSkyUrl, {json: true}, (err, res) => {
    if (err) {
      callback('Error: Cannot connect to server', undefined);
      return;
    }
    if (res.statusCode === 403) {
      callback('Error: Invalid Dark Sky secret key');
      return;
    }
    callback(undefined, res.body.currently);
  });
}

function getCityData(city, callback) {
  const formattedCity = city.split(' ').join('_');
  const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      formattedCity}.json?limit=1&access_token=${credentials.MAPBOX_TOKEN}`;

  request(mapBoxUrl, {json: true}, (err, res) => {
    if (err) {
      callback('Error: Cannot connect to server', undefined);
      return;
    }
    if (res.statusCode === 401) {
      callback('Error: Invalid MapBox token.', undefined);
      return;
    }
    if (res.body.features.length === 0) {
      callback('Error: City not found.', undefined);
      return;
    }
    callback(undefined, res.body.features[0].center)
  });
}

getCityData('Monterrey', (err, coordinates) => {
  if (err) {
    console.log(err);
    return;
  }
  getWeather(coordinates[1], coordinates[0], (err, currentWeather) => {
    if (err) {
      console.log(err);
      return;
    }
    const message = `${currentWeather.summary}. Actualmente esta a ${
        currentWeather.temperature}°C. Hay ${
        currentWeather.precipProbability}% de probabilidad de lluvia.`
    console.log(message);
  })
});
