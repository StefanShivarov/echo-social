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
};

module.exports = postService;
