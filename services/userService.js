const userRepository = require("../repositories/userRepository");
const bcryptjs = require("bcryptjs");

const findUserByEmail = async (email) => {
  return await userRepository.findUserByEmail(email);
};

const findUserById = async (id) => {
  return await userRepository.findUserById(id);
};

const createUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error(`User with email ${userData.email} already exists!`);
  }

  if (userData.password) {
    userData.password = await bcryptjs.hash(userData.password, 10);
  }

  return userRepository.createUser(userData);
};

const updateUser = async (id, updateData) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("User not found!");
  }

  const [updatedCount, updatedUsers] = await userRepository.updateUserById(
    id,
    updateData
  );

  if (updatedCount === 0) {
    throw new Error("Failed to update user!");
  }

  return updatedUsers[0];
};

const deleteUser = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {
    throw new Error("User not found!");
  }

  await userRepository.deleteUserById(id);
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
};
