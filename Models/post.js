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
            trim:true,
        },
        email: {
            type: String,
            required: [true, "Mandatory Feild"],
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('UserPosts', userPosts);