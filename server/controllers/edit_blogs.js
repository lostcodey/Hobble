import { blog_model } from "../configs/blog.js";

export const edit_blogs = async (req, res, next) => {
    console.log(req.body);
    try {
        const existance = await blog_model.findById(req.body.id)
        if (existance && existance.Auther == req.user.ID) {

            existance.Titile = req.body.title;
            existance.Content = req.body.content;
            existance.Status = req.body.status;
            await existance.save()
            res.status(200).send({
                message: "Blog updated successfully",
            });
        } else {
            res.status(404).send(error);
        }
    } catch (error) {
        res.status(404).send(error);
    }
    console.log(req.user)
}