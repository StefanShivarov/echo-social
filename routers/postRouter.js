const router = require("express").Router();
const {
  showPostDetails,
  createPost,
  showCreatePostForm,
  createComment
} = require("../controllers/postController");

router.get("/posts/:id", showPostDetails);
router.get("/create-post", showCreatePostForm);
router.post("/posts", createPost);
router.post("/posts/:id/comments", createComment);
module.exports = router;
