const User = require("./User");
const Follow = require("./Follow");
const Post = require("./Post");

const models = {
  User,
  Follow,
  Post,
  Comment
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
