import fs from 'fs/promises';
import { user_model } from "../configs/user.js";

const string_process = (receive) => {
    let holder_list = []
    let temp = '';
    for (let i = 0; i < receive.length; i++) {
        if (receive[i] == '\n' || receive[i] == ',') {
            if (temp.length > 0) {
                holder_list.push(temp.trim());
            }
            temp = '';
        } else {
            temp += receive[i];
        }
    }
    if (temp.length > 0) {
        holder_list.push(temp.trim());
    }
    return holder_list;
}



export const profile = async (req, res, next) => {
    const { username,
        age,
        profession,
        achievements,
        skills } = req.body


    console.log(req.body)

    // console.log(req.user)

    const store = await user_model.findById(req.user.ID)

    store.Profession = profession;
    store.Age = age;
    store.Skills = string_process(skills)
    store.Achievements = string_process(achievements)
    try {
        const file = req.file.buffer;
        const file_path = "profile_pic/" + req.user.ID + ".png";
        await fs.writeFile(file_path, file);
        store.Userimg = file_path;
    }catch{
        console.log('No file')
    }
    await store.save();
    console.log('Saved...')
    res.status(200).send()
}
