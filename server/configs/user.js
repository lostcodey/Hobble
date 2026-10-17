import mongoose from 'mongoose'

const user_schema = new mongoose.Schema({
    Username: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Userimg: { type: String },
    Profession: { type: String },
    Age: { type: Number },
    Achievements: {
        type: [String],
        default: []
    },
    Skills: {
        type: [String],
        default: []
    }

})

export const user_model = mongoose.model('user_model', user_schema)