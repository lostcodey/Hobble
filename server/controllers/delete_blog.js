import { blog_model } from "../configs/blog.js"


export const delete_blog = async (req, res, next) => {
    try {
        const deleted = await blog_model.findOneAndDelete({
            _id: req.body.id,
            Auther: req.user.ID,
        });
        console.log(deleted)

        if (!deleted) {
            return res.status(404).json({
                message: 'Post not found or you do not have permission to delete it.',
            });
        }

        return res.status(200).json({
            message: 'Post deleted successfully',
        });
    }catch(error){
        console.log(error)
        return res.status(500).send('something went wrong');
    }
}