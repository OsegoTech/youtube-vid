import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post must have a title"]
    },
    body: {
        type: String,
        required: [true, "Post must have a body"]
    },
    image: {
        type: String,
        required: [true, "Post must have an image"],
    },
    author: {
        type: String,
        required: [true, "Post must be associated to an author"],
        default: "Osego Codes"
    }
})

const Post = mongoose.model("Post", PostSchema)

export default Post

