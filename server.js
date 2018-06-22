require('dotenv').config();
const express = require('express');
const { PORT } = require('./config');
const app = express();

app.use( '/', express.static(__dirname + '/public') );
app.use( '/node_modules', express.static(__dirname + '/node_modules') );
app.use( '/src', express.static(__dirname + '/src') );

// app.get('/tokens', function(req, res) {
//   res.json({
//     dark_sky_token: process.env.DARK_SKY_TOKEN,
//     aqi_token: process.env.AQI_TOKEN
//   })
// });

app.listen(PORT, function() {
  console.log(`The server at port ${PORT} is listening.`);
});