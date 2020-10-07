const fetch = require("node-fetch");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidGVtaWRlZXdhbiIsImEiOiJja2ZmbWx3eHgwMm9zMnlzMjRwMzZxaHQ0In0.yKr59AQbPDDQar5ADAWFSQ&limit=1";

  fetch(url)
    .then((resp) => resp.json())
    .then((result) => {
      if (result.message) {
        const { message } = result;
        callback({ message });
      } else {
        const latitude = result.features[0].center[1];
        const longitude = result.features[0].center[0];
        const place = result.features[0].place_name;
        callback({ latitude, longitude, place });
      }
    })
    .catch((err) => {
      callback(
        "some network error maybe preventing you from accessing these services"
      );
    });
};

module.exports = geocode;
