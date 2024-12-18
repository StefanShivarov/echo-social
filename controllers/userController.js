const { User } = require("../models");

const showSignInForm = (req, res) => {
  res.render("signin");
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.redirect("/signin");
  } catch (err) {
    console.error("Error creating user: ", err.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { showSignInForm, createUser };
