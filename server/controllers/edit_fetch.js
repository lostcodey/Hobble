import { blog_model } from "../configs/blog.js";


export const edit_fetch = async (req, res, next) => {
    const { id } = req.body;
    console.log(req.user);
    try {
        const existance = await blog_model.findById(id);
        if (existance && existance.Auther == req.user.ID) {
            console.log('permitted.....')
            res.status(200).send(existance);
        } else {
            console.log('not permitted')
            res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(error);
    }

}