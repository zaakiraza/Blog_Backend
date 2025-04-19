import mongoose from "mongoose";
const users = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please Add Name'],
            minlength: 1,
            maxlength: 20,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please Add Email'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        imgUrl: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please Add Password'],
            minlength: 8,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
)
export default mongoose.model('Users', users);