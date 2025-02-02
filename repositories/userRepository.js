const { Op } = require("sequelize");
const User = require("../models/User");
const Follow = require("../models/Follow");

const userRepository = {
  findAllUsersExcept: (id) => {
    return User.findAll({
      where: { id: { [Op.ne]: id } },
    });
  },

  findUserById: (id) => {
    return User.findByPk(id);
  },

  findUserByEmail: (email) => {
    return User.findOne({ where: { email } });
  },

  createUser: (user) => {
    return User.create(user);
  },

  updateUserById: (id, updateData) => {
    return User.update(updateData, { where: { id }, returning: true });
  },

  deleteUserById: (id) => {
    return User.destroy({ where: { id } });
  },

  getFollowersCount: (id) => {
    return Follow.count({ where: { followingId: id } });
  },

  getFollowingCount: (id) => {
    return Follow.count({ where: { followerId: id } });
  },

  findUsersNotFollowedBy: async (id) => {
    return Follow.findAll({
      where: { followerId: id },
      attributes: ["followingId"],
    }).then((follows) => {
      const followedUserIds = follows.map((follow) => follow.followingId);
      return User.findAll({
        where: {
          id: { [Op.notIn]: followedUserIds.concat(id) },
        },
      }).catch((err) => {
        throw err;
      });
    });
  },

  findUsersFollowedBy: async (id) => {
    return User.findAll({
      include: {
        model: User,
        as: "followers",
        through: { attributes: [] },
        where: { id: id },
      },
    });
  },

  findFollowersForUser: async (id) => {
    return Follow.findAll({
      where: { followerId: id },
      include: [{ model: User, as: "follower" }],
    }).then((follows) => follows.map((follows) => follows.follower));
  },
};

module.exports = userRepository;
