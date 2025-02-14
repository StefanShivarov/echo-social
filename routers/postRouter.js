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
  togglePostLike,
  toggleCommentLike,
  showPostLikes,
  showCommentLikes,
} = require("../controllers/postController");
const upload = require("../middlewares/upload");

router.get("/posts/:id", showPostDetails);

router.get("/create-post", showCreatePostForm);
router.post("/posts", upload.single("image"), createPost);
router.get("/posts/:id/edit", showEditPostForm);
router.put("/posts/:id", upload.single("image"), editPost);
router.delete("/posts/:id", deletePost);

router.post("/posts/:id/comments", createComment);
router.delete("/posts/:postId/comments/:commentId", deleteComment);

router.get("/posts/:postId/likes", showPostLikes);
router.get("/posts/:postId/comments/:commentId/likes", showCommentLikes);
router.post("/posts/:postId/like", togglePostLike);
router.post("/posts/:postId/comments/:commentId/like", toggleCommentLike);

module.exports = router;
