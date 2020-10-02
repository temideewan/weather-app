const fetch = require("node-fetch");
const formatPlace = require("./formatPlace");

const forecast = (
  { latitude, longitude, place } = {
    latitude: "unknown latitude",
    longitude: "unknown longitude",
    place: "place not recognized",
  },
  callback
) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(latitude) +
    "&lon=" +
    encodeURIComponent(longitude) +
    "&appid=96f462a83ec706405ae10c1ba27f2657";

  fetch(url)
    .then((resp) => resp.json())
    .then((result) => {
      if (result.message) {
        const { message } = result;
        callback({ message });
      } else {
        console.log(result.main);
        const { temp } = result.main;
        const { humidity } = result.main;
        const { temp_min: low, temp_max: high } = result.main;
        // const { name } = result;
        callback(
          `The current weather forecast at ${formatPlace(
            place
          )} has the temperature at ${temp} with a humidity of ${humidity}. At it's lowest today we'll be having a temperature of about ${high} degrees and in contrast we'll be having ${low} degrees. Not that much of a change though `
        );
      }
    })
    .catch((err) => {
      callback("there must have been a connection issue" + err);
    });
};

module.exports = forecast;
