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

const showPostDetails = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await postService.getPostById(postId);
    res.render("postDetails", { post });
  } catch (err) {
    console.error("Error fetching post!", err);
  }
};

const showCreatePostForm = async (req, res) => {
  res.render("createPost");
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

module.exports = {
  createPost,
  showPostDetails,
  showCreatePostForm,
  createComment,
};
