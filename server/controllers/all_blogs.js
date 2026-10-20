import { blog_model } from "../configs/blog.js"

export const all_blogs = async (req, res, next) => {
    try {
        const blogs = await blog_model
            .find({ Status: true })
            .select('-__v ')
            .populate('Auther', 'Username Userimg')
            .sort({ updatedAt: -1 });

        console.log(blogs);
        return res.status(200).json(blogs);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}