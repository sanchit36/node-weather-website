const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FuY2hpdGJoYWRnYWwiLCJhIjoiY2tzZnQ4Zzc4MWRpbjJ3bWN6ZXcwdnFmdiJ9.p15xe4n3-TFk2i8T8pEpTw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try another search.", undefined);
    } else {
      const { center, place_name } = body.features[0];
      const latitude = center[1];
      const longitude = center[0];
      const location = place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
};

module.exports = geocode;
