const router = require("express").Router();
const {
  showPostDetails,
  createPost,
  showCreatePostForm,
  createComment,
  deleteComment,
  showEditPostForm,
  editPost,
  deletePost,
} = require("../controllers/postController");

router.get("/posts/:id", showPostDetails);

router.get("/create-post", showCreatePostForm);
router.post("/posts", createPost);
router.get("/posts/:id/edit", showEditPostForm);
router.put("/posts/:id", editPost);
router.delete("/posts/:id", deletePost);

router.post("/posts/:id/comments", createComment);
//router.put("/posts/:postId/comments/:commentId");
router.delete("/posts/:postId/comments/:commentId", deleteComment);
module.exports = router;
