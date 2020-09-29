const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecaast");
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname, "..", "/public"));

// define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "..", "/public");
const viewsPath = path.join(__dirname, "..", "/templates/views");

const partialsPath = path.join(__dirname, "..", "/templates/partials");
hbs.registerPartials(partialsPath);

/**
 * set up handlebars and views location
 */
// set express to use the HBS view engine
app.set("view engine", "hbs");

// customize where your templates should live in
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Temidayo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Temidayo",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    HelpMessage: "Did you know that you could do bla bla bla......",
    title: "Help page",
    name: "temidayo",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "address is required",
    });
  }
  geocode(address, (data) => {
    if (data.message) {
      return res.send({
        error: {
          info: "there may have been a wrong formatting of search query",
          message: data.message,
        },
      });
    }
    forecast(data, (result) => {
      if (result.message) {
        return res.send({
          error: {
            info: "there may have been a wrong formatting of search query",
            message: result.message,
          },
        });
      }
      res.send({
        forecast: result,
        address,
        location: data.place,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "help article not found",
    name: "temidayo",
  });
});
//The location where you put each function is very important in the code too
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "temidayo",
  });
});

app.listen(3000, () => {
  console.log("server up on port 3000");
});

/**
 * with the render method on res
 * we provide a template that we want to render(no
 * need for extensions or anything cause we
 * declared where we want the views to be)
 * then the second argument is an object that has
 * properties that can be switched into the view
 * or the partial.
 *
 */

/**
 * we use the * special symbol to match multiple endpoints
 * this is used in case we want to target an
 * unknown page.
 */
