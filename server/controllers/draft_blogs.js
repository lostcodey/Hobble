import { blog_model } from "../configs/blog.js";

export const draft_blogs = async (req, res, next) => {
    try {
        const blogs = await blog_model
            .find({
                Auther: req.user.ID,
                Status: false
            })
            .select('-__v')
            .sort({ updatedAt: -1 });

        return res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to fetch draft blogs"
        });
    }
};