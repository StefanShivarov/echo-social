const router = require("express").Router();
const {
  showSignUpForm,
  signUpUser,
  showUserProfile,
  showFollowing,
  showFollowers
} = require("../controllers/userController");

router.get("/signup", showSignUpForm);
router.post("/signup", signUpUser);

router.get("/profile", showUserProfile);
router.get("/users/:id/followers", showFollowers);
router.get("/users/:id/following", showFollowing);

module.exports = router;
