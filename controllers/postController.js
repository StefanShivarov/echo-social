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

module.exports = {
  createPost,
  showPostDetails,
  showCreatePostForm,
};
