const { Op } = require("sequelize");
const Post = require("../models/Post");
const User = require("../models/User");

const postRepository = {
  getPostById: (postId) => {
    return Post.findByPk(postId, {
      include: [{ model: User, as: "user" }],
    });
  },
  getPostsCreatedByUser: (userId) => {
    return Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  },

  getPostsFromUsers: (userIds) => {
    return Post.findAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
      },
      include: [{ model: User, as: "user" }],
      order: [["createdAt", "DESC"]],
    });
  },

  createPost: (post) => {
    return Post.create(post);
  },
};

module.exports = postRepository;
