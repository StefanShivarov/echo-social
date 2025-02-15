const express = require("express");
const path = require("path");
const passport = require("passport");
require("./config/passportConfig");
const session = require("express-session");
const flash = require("connect-flash");
const homeRouter = require("./routers/homeRouter");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const chatRouter = require("./routers/chatRouter");
require("./models");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 10800000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash();
  console.log(res.locals.messages);
  next();
});

app.use(homeRouter, userRouter, postRouter);
app.use("/auth", authRouter);
app.use("/direct", chatRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
