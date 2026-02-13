import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      minlength: [1, "Content must be at least 1 character"],
      maxlength: [1000, "Content must not exceed 1000 characters"],
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: [50, "Display name must not exceed 50 characters"],
      default: "Anonymous",
    },
    mood: {
      type: String,
      enum: {
        values: ["happy", "sad", "angry", "anxious"],
        message: "{VALUE} is not a valid mood",
      },
      required: [true, "Mood is required"],
    },
    color: {
      type: String,
      enum: {
        values: ["yellow", "pink", "blue", "green", "purple", "orange"],
        message: "{VALUE} is not a valid color",
      },
      default: "yellow",
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for better query performance
postSchema.index({ createdAt: -1 });
postSchema.index({ likes: -1 });
postSchema.index({ mood: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
