const express = require("express");
const path = require("path");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.resolve("static")));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", userRoutes);

module.exports = app;
