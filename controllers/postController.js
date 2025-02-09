const postService = require("../services/postService");

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const newPost = await postService.createPost({ title, content, userId });
    res.redirect(`/posts/${newPost.id}`);
  } catch (err) {
    console.error("Error creating post!", err);
  }
};

const editPost = async (req, res) => {
  const { title, content } = req.body;
  const postId = req.params.id;

  try {
    const post = await postService.getPostById(postId);
    if (post.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to edit this post!");
    }
    const updatedPost = await postService.editPostById(postId, { title, content });
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
    console.log(post);
    const userId = req.user.id;
    res.render("postDetails", { post, userId });
  } catch (err) {
    console.error("Error fetching post!", err);
  }
};

const showCreatePostForm = async (req, res) => {
  res.render("createPost");
};

const showEditPostForm = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    if (post.userId !== req.user.id) {
      return res.status(403).send("You are not authorized to edit this post!");
    }
    res.render("editPost", { post });
  } catch (err) {
    console.error("Error fetching post!", err);
  }
};

const createComment = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;
  const postId = req.params.id;

  try {
    const comment = await postService.createComment({ content, userId, postId });
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

module.exports = {
  createPost,
  editPost,
  deletePost,
  showPostDetails,
  showCreatePostForm,
  showEditPostForm,
  createComment,
  deleteComment,
};
