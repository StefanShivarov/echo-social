const { Op } = require("sequelize");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const postRepository = {
  getPostById: (postId) => {
    return Post.findByPk(postId, {
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments", include: [{ model: User, as: "user" }] },
      ],
    });
  },

  getPostsCreatedByUser: (userId) => {
    return Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments", include: [{ model: User, as: "user" }] },
      ],
    });
  },

  getPostsFromUsers: (userIds) => {
    return Post.findAll({
      where: {
        userId: {
          [Op.in]: userIds,
        },
      },
      include: [
        { model: User, as: "user" },
        { model: Comment, as: "comments", include: [{ model: User, as: "user" }] },
      ],
      order: [["createdAt", "DESC"]],
    });
  },

  createPost: (post) => {
    return Post.create(post);
  },

  editPostById: (postId, postData) => {
    return Post.update(postData, { where: { id: postId } });
  },

  deletePostById: (postId) => {
    return Post.destroy({ where: { id: postId } });
  },

  createComment: (commentData) => {
    return Comment.create(commentData);
  },

  getCommentById: (commentId) => {
    return Comment.findByPk(commentId, {
      include: [{ model: User, as: "user" }],
    });
  },

  deleteCommentById: (commentId) => {
    return Comment.destroy({ where: { id: commentId } });
  },
};

module.exports = postRepository;
