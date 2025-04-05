import mongoose from "mongoose";
const userPosts = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "Please write something"],
            trim: true,
        },
        postUrl: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Mandatory Feild"],
        },
        name: {
            type: String,
            required: [true, "Mandatory Feild"],
        },
        ImgUrl: {
            type: String,
            required: [true, "Mandatory Feild"],
        }
    }
)

export default mongoose.model('UserPosts', userPosts);