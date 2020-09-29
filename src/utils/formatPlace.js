const formatPlace = (place) => {
  let arr = [];
  let result;

  for (char of place) {
    if (!(char === ",")) {
      arr.push(char);
    } else {
      result = arr.join("");
      return result;
    }
  }
};

module.exports = formatPlace;

// little helper function that just helps to format the place returned
