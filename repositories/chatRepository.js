const { Op } = require("sequelize");
const Chat = require("../models/Chat");
const Message = require("../models/Message");

const chatRepository = {
  findChatByUsers: (firstUserId, secondUserId) => {
    return Chat.findOne({
      where: {
        [Op.or]: [
          {
            firstUserId,
            secondUserId,
          },
          {
            firstUserId: secondUserId,
            secondUserId: firstUserId,
          },
        ],
      },
    });
  },

  createChat: (firstUserId, secondUserId) => {
    return Chat.create({ firstUserId, secondUserId });
  },

  findChatById: (chatId) => {
    return Chat.findByPk(chatId, {
      include: [
        {
          model: Message,
          as: "messages",
        },
      ],
    });
  },

  createMessage: (chatId, senderId, content) => {
    return Message.create({
      chatId,
      senderId,
      content,
    });
  },

  getMessagesByChatId: (chatId) => {
    return Message.findAll({
      where: {
        chatId,
      },
    });
  },
};

module.exports = chatRepository;
