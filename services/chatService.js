const chatRepository = require("../repositories/chatRepository");

const chatService = {
  findChatByUsers: async (firstUserId, secondUserId) => {
    return await chatRepository.findChatByUsers(firstUserId, secondUserId);
  },
  getChatById: async (chatId) => {
    return await chatRepository.findChatById(chatId);
  },
  addMessageToChat: async (chatId, senderId, content) => {
    return await chatRepository.createMessage(chatId, senderId, content);
  },
  createChat: async (firstUserId, secondUserId) => {
    return await chatRepository.createChat(firstUserId, secondUserId);
  },
  getMessagesByChatId: async (chatId) => {
    return await chatRepository.getMessagesByChatId(chatId);
  },
};

module.exports = chatService;
