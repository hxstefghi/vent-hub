import Post from "../models/Post.js";

class PostService {
  /**
   * Create a new post
   */
  async createPost(postData) {
    const { content, displayName, color } = postData;

    const post = await Post.create({
      content,
      displayName: displayName?.trim() || "Anonymous",
      color: color || "yellow",
    });

    return post;
  }

  /**
   * Get all posts with pagination, filtering, and sorting
   */
  async getAllPosts(options = {}) {
    const { page = 1, limit = 10, sortBy = "latest" } = options;

    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    // Determine sort order
    let sort = {};
    switch (sortBy) {
      case "latest":
        sort = { createdAt: -1 };
        break;
      case "oldest":
        sort = { createdAt: 1 };
        break;
      case "mostLiked":
        sort = { likes: -1, createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    // Execute queries in parallel
    const [posts, totalPosts] = await Promise.all([
      Post.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Post.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      posts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        postsPerPage: limit,
        hasNextPage,
        hasPreviousPage,
      },
    };
  }

  /**
   * Get a single post by ID
   */
  async getPostById(postId) {
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  /**
   * Like a post (increment likes count)
   */
  async likePost(postId) {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true, runValidators: true },
    );

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  /**
   * Delete a post
   */
  async deletePost(postId) {
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }

  /**
   * Get posts statistics
   */
  async getPostsStats() {
    const stats = await Post.aggregate([
      {
        $group: {
          _id: "$mood",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalPosts = await Post.countDocuments();

    return {
      totalPosts,
      byMood: stats.reduce((acc, stat) => {
        acc[stat._id] = stat.count;
        return acc;
      }, {}),
    };
  }
}

export default new PostService();
