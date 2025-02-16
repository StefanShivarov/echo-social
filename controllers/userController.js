const userService = require("../services/userService");
const postService = require("../services/postService");
const chatService = require("../services/chatService");

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
    const isFollowed = !!(await userService.findFollowRecord(req.user.id, userId));
    let chat = null;
    if (loggedInUserId) {
      chat = await chatService.findChatByUsers(loggedInUserId, userId);
    }
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const postLiked = await postService.getLikeByPostIdAndUserId(post.id, loggedInUserId);
        const commentsWithLikes = await Promise.all(
          post.comments.map(async (comment) => {
            const commentLiked = await postService.getLikeByCommentIdAndUserId(
              comment.id,
              loggedInUserId
            );
            return { ...comment.toJSON(), liked: !!commentLiked };
          })
        );
        return {
          ...post.toJSON(),
          liked: !!postLiked,
          comments: commentsWithLikes,
        };
      })
    );

    res.render("profile", {
      user,
      followersCount,
      followingCount,
      loggedInUserId,
      posts: postsWithLikes,
      chat,
      isFollowed,
      loggedInUser: req.user,
    });
  } catch (err) {
    console.error("Error loading profile!", err);
  }
};

const showEditProfilePage = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userService.findUserById(userId);
    res.render("editProfile", { user });
  } catch (err) {
    console.error("Error loading edit profile page!", err);
  }
};

const editUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;
  let profilePictureUrl = null;
  if (req.file) {
    profilePictureUrl = req.file.path;
  }

  try {
    await userService.updateUser(userId, { username, profilePictureUrl });
    res.redirect(`/users/${userId}`);
  } catch (err) {
    console.error("Error updating user profile!", err);
  }
};

const showFollowing = async (req, res) => {
  const userId = req.params.id;
  try {
    const viewedUser = await userService.findUserById(userId);
    const following = await userService.getFollowing(userId);
    res.render("usersList", {
      user: req.user,
      userId,
      users: following,
      backLink: `/users/${userId}`,
      viewedUser,
      title: `Users followed by ${viewedUser.username}`,
    });
  } catch (err) {
    console.error("Error fetching followed users!", err);
  }
};

const showFollowers = async (req, res) => {
  const userId = req.params.id;
  try {
    const viewedUser = await userService.findUserById(userId);
    const followers = await userService.getFollowersForUser(userId);
    res.render("usersList", {
      user: req.user,
      userId,
      users: followers,
      viewedUser,
      backLink: `/users/${userId}`,
      title: `Users following ${viewedUser.username}`,
    });
  } catch (err) {
    console.error("Error fetching followers!", err);
  }
};

const showExplorePage = async (req, res) => {
  const user = req.user;

  try {
    const usersNotFollowed = await userService.findUsersNotFollowedBy(user.id);
    res.render("explore", { user: req.user, usersNotFollowed });
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
  showEditProfilePage,
  editUserProfile,
};
