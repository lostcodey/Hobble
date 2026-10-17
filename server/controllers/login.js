import bcrypt from 'bcrypt'
import { user_model } from '../configs/user.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const login = async (req, res, next) => {

    const { Email, Password } = req.body;
    const existance = await user_model.findOne({ Email: Email });

    if (existance) {
        const pass = await bcrypt.compare(Password, existance.Password);
        if (pass) {
            const token = jwt.sign({ ID: existance._id,Name:existance.Username }, process.env.secret_key, { expiresIn: '1h' });

            res.status(200).cookie('accessToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000
            }).json({
                message: "Login successful"
            });
        }
    }

    else {
        res.status(400).json({
            message: "Some thing went wrong"
        })
    }
}