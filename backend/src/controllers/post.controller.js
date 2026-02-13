import postService from "../services/post.service.js";

class PostController {
  /**
   * @route   POST /api/posts
   * @desc    Create a new post
   * @access  Public
   */
  async createPost(req, res, next) {
    try {
      const { content, displayName, mood, color } = req.body;

      const post = await postService.createPost({
        content,
        displayName,
        mood,
        color,
      });

      res.status(201).json({
        status: "success",
        message: "Post created successfully",
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/posts
   * @desc    Get all posts with pagination and filtering
   * @access  Public
   */
  async getAllPosts(req, res, next) {
    try {
      const { page, limit, mood, sortBy } = req.query;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        mood,
        sortBy,
      };

      const result = await postService.getAllPosts(options);

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/posts/:id
   * @desc    Get a single post
   * @access  Public
   */
  async getPostById(req, res, next) {
    try {
      const { id } = req.params;

      const post = await postService.getPostById(id);

      res.status(200).json({
        status: "success",
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   PATCH /api/posts/:id/like
   * @desc    Like a post
   * @access  Public
   */
  async likePost(req, res, next) {
    try {
      const { id } = req.params;

      const post = await postService.likePost(id);

      res.status(200).json({
        status: "success",
        message: "Post liked successfully",
        data: { post },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   DELETE /api/posts/:id
   * @desc    Delete a post
   * @access  Public (In production, should be protected)
   */
  async deletePost(req, res, next) {
    try {
      const { id } = req.params;

      await postService.deletePost(id);

      res.status(200).json({
        status: "success",
        message: "Post deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @route   GET /api/posts/stats
   * @desc    Get posts statistics
   * @access  Public
   */
  async getPostsStats(req, res, next) {
    try {
      const stats = await postService.getPostsStats();

      res.status(200).json({
        status: "success",
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
