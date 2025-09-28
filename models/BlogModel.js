import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    author: {
        type: String,
        required: true
    },
    image: {  // Changed from 'Image' to 'image' to match your interface
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    author_img: {  // Changed from 'authorImg' to 'author_img' to match your interface
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    content: {
        introduction: String,
        sections: [{
            title: String,
            content: String
        }],
        conclusion: String
    },
    readTime: String,
    tags: { type: [String], index: true }
}, {
    timestamps: true  // This adds createdAt and updatedAt fields
});

// Additional indexes
blogSchema.index({ createdAt: -1 });

// Generate slug before saving
blogSchema.pre('save', function(next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

const BlogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default BlogModel;
