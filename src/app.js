const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Sanchit Bhadgal" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Sanchit Bhadgal" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Its a Something helpful",
    name: "Sanchit Bhadgal",
  });
});

app.get("/weather", (req, res) => {
  const addressQueryString = req.query.address;

  if (!addressQueryString) {
    return res.send({
      error: "You must provide a valid address",
    });
  }

  geocode(
    addressQueryString,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: addressQueryString,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
    name: "Sanchit Bhadgal",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Sanchit Bhadgal",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
