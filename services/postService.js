const postRepository = require("../repositories/postRepository");

const postService = {
  getPostsCreatedByUser: async (userId) => {
    try {
      return await postRepository.getPostsCreatedByUser(userId);
    } catch (err) {
      throw new Error("Error fetching posts!", err);
    }
  },

  createPost: async (postData) => {
    try {
      return await postRepository.createPost(postData);
    } catch (err) {
      throw new Error("Error creating post!", err);
    }
  },

  getPostsFromUsers: async (userIds) => {
    try {
      return await postRepository.getPostsFromUsers(userIds);
    } catch (err) {
      console.err("Error fetching posts!", err);
    }
  },

  getPostById: async (postId) => {
    try {
      return await postRepository.getPostById(postId);
    } catch (err) {
      console.error("Error fetching post!", err);
    }
  },

  editPostById: async (postId, postData) => {
    try {
      return await postRepository.editPostById(postId, postData);
    } catch (err) {
      console.error("Error updating post!", err);
    }
  },

  deletePostById: async (postId) => {
    try {
      return await postRepository.deletePostById(postId);
    } catch (err) {
      console.error("Error deleting post!", err);
    }
  },

  createComment: async (commentData) => {
    try {
      return await postRepository.createComment(commentData);
    } catch (err) {
      console.error("Error creating comment!", err);
    }
  },

  getCommentById: async (commentId) => {
    try {
      return await postRepository.getCommentById(commentId);
    } catch (err) {
      console.error("Error fetching comment!", err);
    }
  },

  deleteCommentById: async (commentId) => {
    try {
      return await postRepository.deleteCommentById(commentId);
    } catch (err) {
      console.error("Error deleting comment!", err);
    }
  },

  getAllLikesForPost: async (postId) => {
    try {
      return await postRepository.getAllLikesForPost(postId);
    } catch (err) {
      console.error("Error fetching likes!", err);
    }
  },

  getAllLikesForComment: async (commentId) => {
    try {
      return await postRepository.getAllLikesForComment(commentId);
    } catch (err) {
      console.error("Error fetching likes!", err);
    }
  },

  getLikeByPostIdAndUserId: async (postId, userId) => {
    try {
      return await postRepository.getLikeByPostIdAndUserId(postId, userId);
    } catch (err) {
      console.error("Error fetching like!", err);
    }
  },

  getLikeByCommentIdAndUserId: async (commentId, userId) => {
    try {
      return await postRepository.getLikeByCommentIdAndUserId(commentId, userId);
    } catch (err) {
      console.error("Error fetching like!", err);
    }
  },

  createLikeForPost: async (postId, userId) => {
    try {
      return await postRepository.createLikeForPost(postId, userId);
    } catch (err) {
      console.error("Error creating like!", err);
    }
  },

  deleteLikeForPost: async (postId, userId) => {
    try {
      return await postRepository.deleteLikeForPost(postId, userId);
    } catch (err) {
      console.error("Error deleting like!", err);
    }
  },

  createLikeForComment: async (commentId, userId) => {
    try {
      return await postRepository.createLikeForComment(commentId, userId);
    } catch (err) {
      console.error("Error creating like!", err);
    }
  },

  deleteLikeForComment: async (commentId, userId) => {
    try {
      return await postRepository.deleteLikeForComment(commentId, userId);
    } catch (err) {
      console.error("Error deleting like!", err);
    }
  },
};

module.exports = postService;
