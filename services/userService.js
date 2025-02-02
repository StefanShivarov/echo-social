const userRepository = require("../repositories/userRepository");
const bcryptjs = require("bcryptjs");

const userService = {
  findOtherUsers: async (id) => {
    return await userRepository.findAllUsersExcept(id);
  },

  findUserByEmail: async (email) => {
    return await userRepository.findUserByEmail(email);
  },

  findUserById: async (id) => {
    return await userRepository.findUserById(id);
  },

  createUser: async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error(`User with email ${userData.email} already exists!`);
    }

    if (userData.password) {
      userData.password = await bcryptjs.hash(userData.password, 10);
    }

    return userRepository.createUser(userData);
  },

  updateUser: async (id, updateData) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error("User not found!");
    }

    const [updatedCount, updatedUsers] = await userRepository.updateUserById(id, updateData);

    if (updatedCount === 0) {
      throw new Error("Failed to update user!");
    }

    return updatedUsers[0];
  },

  deleteUser: async (id) => {
    const user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error("User not found!");
    }

    await userRepository.deleteUserById(id);
  },

  getFollowersCount: async (id) => {
    return await userRepository.getFollowersCount(id);
  },

  getFollowingCount: async (id) => {
    return await userRepository.getFollowingCount(id);
  },

  getFollowing: async (id) => {
    return await userRepository.findUsersFollowedBy(id);
  },

  getFollowersForUser: async (id) => {
    return await userRepository.findFollowersForUser(id);
  },
};

module.exports = userService;
