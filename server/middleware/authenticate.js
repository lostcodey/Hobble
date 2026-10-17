import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticate = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decode = jwt.verify(
            token,
            process.env.secret_key
        );
        
        req.user = decode;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
};

