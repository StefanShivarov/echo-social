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
const { ensureAuthenticated } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.get("/posts/:id", ensureAuthenticated, showPostDetails);

router.get("/create-post", ensureAuthenticated, showCreatePostForm);
router.post("/posts", [ensureAuthenticated, upload.single("image")], createPost);
router.get("/posts/:id/edit", showEditPostForm);
router.put("/posts/:id", [ensureAuthenticated, upload.single("image")], editPost);
router.delete("/posts/:id", ensureAuthenticated, deletePost);

router.post("/posts/:id/comments", ensureAuthenticated, createComment);
router.delete("/posts/:postId/comments/:commentId", ensureAuthenticated, deleteComment);

router.get("/posts/:postId/likes", ensureAuthenticated, showPostLikes);
router.get("/posts/:postId/comments/:commentId/likes", ensureAuthenticated, showCommentLikes);
router.post("/posts/:postId/like", ensureAuthenticated, togglePostLike);
router.post("/posts/:postId/comments/:commentId/like", ensureAuthenticated, toggleCommentLike);

module.exports = router;
