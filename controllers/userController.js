const { createUser } = require("../services/userService");

const showSignUpForm = (req, res) => {
  res.render("signup");
};

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await createUser({ username, email, password });
    res.redirect("/auth/signin");
  } catch (err) {
    console.error("Error creating user: ", err.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { showSignUpForm, signUpUser };
