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
  showEditProfilePage,
  editUserProfile,
} = require("../controllers/userController");
const upload = require("../middlewares/upload");

router.get("/signup", showSignUpForm);
router.post("/signup", signUpUser);

router.get("/users/:id", showUserProfile);
router.get("/users/:id/followers", showFollowers);
router.get("/users/:id/following", showFollowing);

router.get("/explore", showExplorePage);

router.post("/users/:id/follow", followUser);
router.post("/users/:id/unfollow", unfollowUser);

router.get("/profile/edit", showEditProfilePage);
router.post("/profile/edit", upload.single("profilePicture"), editUserProfile);
module.exports = router;
