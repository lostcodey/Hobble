import { user_model } from "../configs/user.js";

export const profile_check = async(req,res,next)=>{
    const user = await user_model.findById(req.user.ID);
    console.log(typeof user)

    if(user){
        const user1 = user.toObject();
        delete user1.Password;
        delete user1._id;

        res.send(user1)
    }
} 