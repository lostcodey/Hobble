import { blog_model } from "../configs/blog.js";

export const view_fetch = async (req, res, next) => {
    const { id } = req.body;
    console.log('HELELLELELE')
    try {
        const existance = await blog_model.findById(id);

        if (!existance) {
            return res.status(404).json({
                message: 'Blog not found'
            });
        }

        if (!existance.Status) {
            return res.status(403).json({
                message: 'Inaccessible'
            });
        }

        return res.status(200).json(existance);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Failed to fetch blog'
        });
    }
};