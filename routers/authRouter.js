const router = require("express").Router();
const {
  showSignInForm,
  signIn,
  authenticateWithGoogle,
  googleAuthCallback,
  signOut,
} = require("../controllers/authController");

router.get("/signin", showSignInForm);
router.post("/signin", signIn);

router.get("/google", authenticateWithGoogle);
router.get("/google/callback", googleAuthCallback, (req, res) => {
  res.redirect("/");
});

router.get("/signout", signOut);

module.exports = router;
