const postService = require("../services/postService");
const userService = require("../services/userService");
const { findOtherUsers } = require("../services/userService");

const showHomepage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render("landing");
  } else {
    const followedUsersIds = req.user.followedUsers.map((user) => user.id);
    const followedUsersPosts = await postService.getPostsFromUsers(followedUsersIds);
    return res.render("index", { user: req.user, followedUsersPosts });
  }
};

module.exports = { showHomepage };
