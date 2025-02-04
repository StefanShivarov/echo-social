const router = require("express").Router();
const {
  showSignUpForm,
  signUpUser,
  showUserProfile,
  showFollowing,
  showFollowers,
  showExplorePage,
  followUser,
  unfollowUser,
} = require("../controllers/userController");

router.get("/signup", showSignUpForm);
router.post("/signup", signUpUser);

router.get("/users/:id", showUserProfile);
router.get("/users/:id/followers", showFollowers);
router.get("/users/:id/following", showFollowing);

router.get("/explore", showExplorePage);

router.post("/users/:id/follow", followUser);
router.post("/users/:id/unfollow", unfollowUser);

module.exports = router;
