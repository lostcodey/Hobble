import mongoose from 'mongoose'


const blog_schema = new mongoose.Schema({
    Auther:{type: mongoose.Schema.Types.ObjectId,ref: 'user_model',required:true},
    Titile:{type:String,required:true},
    Content:{type: mongoose.Schema.Types.Mixed,required:true},
    Status:{type:Boolean,required:true,default:0},

},{timestamps:true})

export const blog_model = mongoose.model('blog_model',blog_schema)