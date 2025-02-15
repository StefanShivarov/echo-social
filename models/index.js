const User = require("./User");
const Follow = require("./Follow");
const Post = require("./Post");
const Comment = require("./Comment");
const Like = require("./Like");
const Chat = require("./Chat");
const Message = require("./Message");

const models = {
  User,
  Follow,
  Post,
  Comment,
  Like,
  Chat,
  Message,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
