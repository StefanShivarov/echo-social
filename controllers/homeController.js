const postService = require("../services/postService");
const userService = require("../services/userService");
const { findOtherUsers } = require("../services/userService");

const showHomepage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render("landing");
  } else {
    const followedUsersIds = req.user.followedUsers.map((user) => user.id);
    const followedUsersPosts = await postService.getPostsFromUsers(followedUsersIds);

    const loggedInUserId = req.user.id;
    const postsWithLikes = await Promise.all(
      followedUsersPosts.map(async (post) => {
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
        return { ...post.toJSON(), liked: !!postLiked, comments: commentsWithLikes };
      })
    );

    return res.render("index", { user: req.user, followedUsersPosts: postsWithLikes });
  }
};

module.exports = { showHomepage };
