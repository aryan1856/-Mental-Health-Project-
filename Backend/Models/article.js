import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : false
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        // required : true
    },
    category : {
        type : Array,
        required : false
    },
    likes : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

const Article = mongoose.model("Article", articleSchema);

export default Article;