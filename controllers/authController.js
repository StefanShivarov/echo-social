const passport = require("passport");

const showSignInForm = (req, res) => {
  res.render("signin");
};

const signIn = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/signin",
    failureFlash: true,
  })(req, res, next);
};

const authenticateWithGoogle = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { failureRedirect: "/" })(req, res, next);
};

const signOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session: ", err);
      }
      res.redirect("/");
    });
  });
};

module.exports = {
  showSignInForm,
  signIn,
  authenticateWithGoogle,
  googleAuthCallback,
  signOut,
};
