const User = require("./User");
const Follow = require("./Follow");

const models = {
  User,
  Follow,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
