const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e33c64b777c1992ec2099d5455732e88&query=${latitude},${longitude}&units=m`;
  request.get({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", data);
    } else if (body.error) {
      callback("Unable to find the location!", undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degree out, it feels like ${feelslike} degree out.`
      );
    }
  });
};

module.exports = forecast;
