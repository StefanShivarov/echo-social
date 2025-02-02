const userService = require("../services/userService");

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
  const user = req.user;
  if (!user) {
    return res.redirect("/signin");
  }

  try {
    const followersCount = await userService.getFollowersCount(user.id);
    const followingCount = await userService.getFollowingCount(user.id);

    res.render("profile", { user, followersCount, followingCount });
  } catch (err) {
    console.error("Error loading profile!", err);
  }
};

const showFollowing = async (req, res) => {
  const userId = req.params.id;
  try {
    const following = await userService.getFollowing(userId);
    res.render("following", { following });
  } catch (err) {
    console.error("Error fetching followed users!", err);
  }
};

const showFollowers = async (req, res) => {
  const userId = req.params.id;
  try { 
    const followers = await userService.getFollowersForUser(userId);
    res.render("followers", {followers});
  } catch (err) {
    console.error("Error fetching followers!", err);
  }
};

module.exports = { showSignUpForm, signUpUser, showUserProfile, showFollowing, showFollowers };
