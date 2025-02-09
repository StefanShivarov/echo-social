const userService = require("../services/userService");
const postService = require("../services/postService");

const showSignUpForm = (req, res) => {
  res.render("signup");
};

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await userService.createUser({ username, email, password });
    res.redirect("/auth/signin");
  } catch (err) {
    console.error("Error creating user: ", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const showUserProfile = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userService.findUserById(userId);
    const followersCount = await userService.getFollowersCount(userId);
    const followingCount = await userService.getFollowingCount(userId);
    const posts = await postService.getPostsCreatedByUser(userId);
    const loggedInUserId = req.user.id;

    res.render("profile", { user, followersCount, followingCount, posts, loggedInUserId });
  } catch (err) {
    console.error("Error loading profile!", err);
  }
};

const showFollowing = async (req, res) => {
  const userId = req.params.id;
  try {
    console.log(userId);
    const following = await userService.getFollowing(userId);
    res.render("following", { userId, following });
  } catch (err) {
    console.error("Error fetching followed users!", err);
  }
};

const showFollowers = async (req, res) => {
  const userId = req.params.id;
  try {
    const followers = await userService.getFollowersForUser(userId);
    res.render("followers", { userId, followers });
  } catch (err) {
    console.error("Error fetching followers!", err);
  }
};

const showExplorePage = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.redirect("/signin");
  }

  try {
    const usersNotFollowed = await userService.findUsersNotFollowedBy(user.id);
    res.render("explore", { usersNotFollowed });
  } catch (err) {
    console.error("Error fetching users!", err);
  }
};

const followUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  try {
    await userService.followUser(followerId, followingId);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const unfollowUser = async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;

  try {
    await userService.unfollowUser(followerId, followingId);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

module.exports = {
  showSignUpForm,
  signUpUser,
  showUserProfile,
  showFollowing,
  showFollowers,
  showExplorePage,
  followUser,
  unfollowUser,
};
