const router = require("express").Router();
const { showChatPage, createChat, getChatMessages } = require("../controllers/chatController");

router.post("/", createChat);
router.get("/:chatId", showChatPage);
router.get("/:chatId/messages", getChatMessages);

module.exports = router;
