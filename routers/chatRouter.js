const router = require("express").Router();
const { showChatPage, createChat, getChatMessages } = require("../controllers/chatController");
const { ensureAuthenticated } = require("../middlewares/authMiddleware");

router.post("/", ensureAuthenticated, createChat);
router.get("/:chatId", ensureAuthenticated, showChatPage);
router.get("/:chatId/messages", ensureAuthenticated, getChatMessages);

module.exports = router;
