const router = require("express").Router();
const {
  showPostDetails,
  createPost,
  showCreatePostForm,
} = require("../controllers/postController");

router.get("/posts/:id", showPostDetails);
router.get("/create-post", showCreatePostForm);
router.post("/posts", createPost);
module.exports = router;
