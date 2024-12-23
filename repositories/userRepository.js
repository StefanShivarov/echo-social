const User = require("../models/User");

const userRepository = {
  findUserById: async (id) => {
    return User.findByPk(id);
  },

  findUserByEmail: async (email) => {
    return User.findOne({ where: { email } });
  },

  createUser: async (user) => {
    return User.create(user);
  },

  updateUserById: async (id, updateData) => {
    return User.update(updateData, { where: { id }, returning: true });
  },

  deleteUserById: async (id) => {
    return User.destroy({ where: { id } });
  },
};

module.exports = userRepository;
