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
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/signup", showSignUpForm);
router.post("/signup", signUpUser);

router.get("/users/:id", ensureAuthenticated, showUserProfile);
router.get("/users/:id/followers", ensureAuthenticated, showFollowers);
router.get("/users/:id/following", ensureAuthenticated, showFollowing);

router.get("/explore", showExplorePage);

router.post("/users/:id/follow", ensureAuthenticated, followUser);
router.post("/users/:id/unfollow", ensureAuthenticated, unfollowUser);

router.get("/profile/edit", ensureAuthenticated, showEditProfilePage);
router.post(
  "/profile/edit",
  [ensureAuthenticated, upload.single("profilePicture")],
  editUserProfile
);
module.exports = router;
