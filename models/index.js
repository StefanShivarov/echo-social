const User = require("./User");
const Follow = require("./Follow");
const Post = require("./Post");

const models = {
  User,
  Follow,
  Post,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
