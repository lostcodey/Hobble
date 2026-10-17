import { user_model } from "../configs/user.js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export const register = async (req, res, next) => {
    const { Username, Email, Password } = req.body;

    try {
        const Password_hashed = await bcrypt.hash(Password, Number(process.env.hash_key));
        console.log(Password_hashed)
        const User_doc = new user_model({
            Username: Username,
            Email: Email,
            Password: Password_hashed
        })
        await User_doc.save();
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Some thing went wrong'
        })
    }
}