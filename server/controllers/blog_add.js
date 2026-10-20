
import { blog_model } from "../configs/blog.js";

export const blog_add = async (req, res, next) => {
    const { title, content, status } = req.body;

    try {
        const blog_doc = new blog_model({
            Auther: req.user.ID,
            Titile: title,
            Content: content,
            Status: status,
        });

        await blog_doc.save();

        return res.status(200).json({
            message: "Blog saved successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to save blog"
        });
    }
};
