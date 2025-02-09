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
};

module.exports = postService;
