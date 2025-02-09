const { Op } = require("sequelize");
const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const Like = require("../models/Like");

const postRepository = {
  getPostById: (postId) => {
    return Post.findByPk(postId, {
      include: [
        { model: User, as: "user" },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user" },
            {
              model: Like,
              as: "likes",
              include: [{ model: User, as: "user" }],
            },
          ],
        },
        {
          model: Like,
          as: "likes",
          include: [{ model: User, as: "user" }],
        },
      ],
    });
  },

  getPostsCreatedByUser: (userId) => {
    return Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      include: [
        { model: User, as: "user" },
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user" },
            { model: Like, as: "likes", include: [{ model: User, as: "user" }] },
          ],
        },
        { model: Like, as: "likes", include: [{ model: User, as: "user" }] },
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
        {
          model: Comment,
          as: "comments",
          include: [
            { model: User, as: "user" },
            { model: Like, as: "likes", include: [{ model: User, as: "user" }] },
          ],
        },
        { model: Like, as: "likes", include: [{ model: User, as: "user" }] },
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

  getAllLikesForPost: (postId) => {
    return Like.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, as: "user" }],
    });
  },

  getAllLikesForComment: (commentId) => {
    return Like.findAll({
      where: { commentId },
      order: [["createdAt", "DESC"]],
      include: [{ model: User, as: "user" }],
    });
  },

  getLikeByPostIdAndUserId: (postId, userId) => {
    return Like.findOne({ where: { postId, userId } });
  },

  getLikeByCommentIdAndUserId: (commentId, userId) => {
    return Like.findOne({ where: { commentId, userId } });
  },

  createLikeForPost: (postId, userId) => {
    return Like.create({ postId, userId });
  },

  createLikeForComment: (commentId, userId) => {
    return Like.create({ commentId, userId });
  },

  deleteLikeForPost: (postId, userId) => {
    return Like.destroy({ where: { postId, userId } });
  },

  deleteLikeForComment: (commentId, userId) => {
    return Like.destroy({ where: { commentId, userId } });
  },
};

module.exports = postRepository;
