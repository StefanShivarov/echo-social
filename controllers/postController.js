const postService = require("../services/postService");

const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  let imageUrl = null;

  if (req.file) {
    imageUrl = req.file.path;
  }

  try {
    const newPost = await postService.createPost({ content, userId, imageUrl });
    res.redirect(`/posts/${newPost.id}`);
  } catch (err) {
    console.error("Error creating post!", err);
  }
};

const editPost = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  let imageUrl = null;

  if (req.file) {
    imageUrl = req.file.path;
  }

  try {
    const post = await postService.getPostById(postId);
    if (post.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to edit this post!");
    }
    const updatedPost = await postService.editPostById(postId, {
      content,
      imageUrl,
    });
    res.redirect(`/posts/${postId}`);
  } catch (err) {
    console.error("Error updating post!", err);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    if (post.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to delete this post!");
    }
    await postService.deletePostById(postId);
    res.redirect(`/users/${req.user.id}`);
  } catch (err) {
    console.error("Error deleting post!", err);
  }
};

const showPostDetails = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    const userId = req.user.id;
    const postLiked = await postService.getLikeByPostIdAndUserId(postId, userId);
    const commentsWithLikes = await Promise.all(
      post.comments.map(async (comment) => {
        const commentLiked = await postService.getLikeByCommentIdAndUserId(comment.id, userId);
        return { ...comment.toJSON(), liked: !!commentLiked };
      })
    );
    res.render("postDetails", {
      user: req.user,
      post,
      userId,
      postLiked: !!postLiked,
      commentsWithLikes,
    });
  } catch (err) {
    console.error("Error fetching post!", err);
  }
};

const showCreatePostForm = async (req, res) => {
  res.render("createPost", { user: req.user });
};

const showEditPostForm = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    if (post.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to edit this post!");
    }
    res.render("editPost", { user: req.user, post });
  } catch (err) {
    console.error("Error fetching post!", err);
  }
};

const createComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const comment = await postService.createComment({
      content,
      userId,
      postId,
    });
    const commentWithUser = await postService.getCommentById(comment.id);
    res.status(200).json(commentWithUser);
  } catch (err) {
    console.error("Error creating comment!", err);
  }
};

const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const comment = await postService.getCommentById(commentId);
    if (comment.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to delete this comment!");
    }
    await postService.deleteCommentById(commentId);
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting comment!", err);
  }
};

const showPostLikes = async (req, res) => {
  const postId = req.params.postId;
  try {
    const likeUsers = (await postService.getAllLikesForPost(postId)).map((like) => like.user);
    res.render("usersList", {
      user: req.user,
      users: likeUsers,
      postId,
      backLink: `/posts/${postId}`,
      title: "Post likes",
    });
  } catch (err) {
    res.status(500).send("Error fetching likes!");
    console.error("Error fetching likes!", err);
  }
};

const showCommentLikes = async (req, res) => {
  const commentId = req.params.commentId;
  const postId = req.params.postId;
  try {
    const likeUsers = (await postService.getAllLikesForComment(commentId)).map((like) => like.user);
    res.render("usersList", {
      user: req.user,
      users: likeUsers,
      postId,
      backLink: `/posts/${postId}`,
      title: "Comment likes",
    });
  } catch (err) {
    res.status(500).send("Error fetching likes!");
    console.error("Error fetching likes!", err);
  }
};

const togglePostLike = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.id;

  const likeExists = await postService.getLikeByPostIdAndUserId(postId, userId);

  try {
    if (likeExists) {
      await postService.deleteLikeForPost(postId, userId);
      return res.status(200).send({ liked: false });
    } else {
      await postService.createLikeForPost(postId, userId);
      return res.status(200).send({ liked: true });
    }
  } catch (err) {
    console.error("Error toggling like!", err);
    res.status(500).send("Error toggling like!");
  }
};

const toggleCommentLike = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  const likeExists = await postService.getLikeByCommentIdAndUserId(commentId, userId);

  try {
    if (likeExists) {
      await postService.deleteLikeForComment(commentId, userId);
      return res.status(200).send({ liked: false });
    } else {
      await postService.createLikeForComment(commentId, userId);
      return res.status(200).send({ liked: true });
    }
  } catch (err) {
    console.error("Error toggling like!", err);
    res.status(500).send("Error toggling like!");
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  showPostDetails,
  showCreatePostForm,
  showEditPostForm,
  createComment,
  deleteComment,
  showPostLikes,
  showCommentLikes,
  togglePostLike,
  toggleCommentLike,
};
