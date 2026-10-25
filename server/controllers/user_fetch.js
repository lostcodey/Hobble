import { blog_model } from "../configs/blog.js";
import { user_model } from "../configs/user.js";

export const user_fetch = async (req, res, next) => {
    try {
        const user = await user_model
            .findById(req.user.ID)
            .select("Username Email Profession Userimg");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const exitance = await blog_model
            .find({ Auther: req.user.ID })
            .select("Titile Status createdAt updatedAt")
            .sort({ Status: -1, updatedAt: -1 });

        return res.status(200).json({
            user,
            exitance
        });

    } catch (error) {
        console.log(error)
        return res.status(500).send('something went wrong');
    }
};