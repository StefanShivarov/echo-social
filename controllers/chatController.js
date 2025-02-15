const chatService = require("../services/chatService");
const userService = require("../services/userService");

const showChatPage = async (req, res) => {
  const chatId = req.params.chatId;
  const loggedUserId = req.user.id;

  try {
    const chat = await chatService.getChatById(chatId);
    if (!chat) {
      return res.status(404).send("Chat not found!");
    }
    const currentUser = await userService.findUserById(loggedUserId);
    const otherUserId = chat.firstUserId === loggedUserId ? chat.secondUserId : chat.firstUserId;
    const otherUser = await userService.findUserById(otherUserId);
    res.render("chat", { chatId, currentUser, otherUser, messages: chat.messages });
  } catch (err) {
    console.error("Error loading chat!", err);
    res.status(500).send("Error loading chat!");
  }
};

const createChat = async (req, res) => {
  const firstUserId = req.user.id;
  const secondUserId = req.body.userId;

  try {
    const chat = await chatService.createChat(firstUserId, secondUserId);
    res.redirect(`/direct/${chat.id}`);
  } catch (err) {
    res.status(500).send("Could not create chat!");
    console.error(err);
  }
};

const getChatMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await chatService.getMessagesByChatId(chatId);
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages: ", err);
    res.status(500).send("Error fetching messages!");
  }
};

module.exports = {
  showChatPage,
  createChat,
  getChatMessages,
};
