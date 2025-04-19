import users from "../Models/users.js";
import UserPosts from "../Models/post.js"

export const getAllPosts = async (req, res) => {
    try {
        const allpost = await UserPosts.find().sort({ createdAt: -1 });
        if (allpost.len == 0) {
            res.status(200).json({
                status: false,
                message: "No post found",
            })
        }
        else {
            res.status(200).json({
                status: true,
                message: "All posts",
                data: allpost,
                count: allpost.length
            })
        }
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}

export const singleUserPosts = async (req, res) => {
    let requestedEmail = req.params.email;
    try {
        const posts = await UserPosts.find({ email: requestedEmail });
        if (posts.length > 0) {
            return res.status(200).json({
                status: true,
                data: posts
            })
        }
        res.status(404).json({
            status: false,
            message: "No post Found"
        })
    }
    catch (e) {
        console.log(e);
    }
}

export const getAllPostCount = async (req, res) => {
    try {
        const posts = await UserPosts.find();
        if (posts.length > 0) {
            return res.status(200).json({
                status: true,
                count: posts.length
            })
        }
        res.status(404).json({
            status: false,
            message: "No post avaliable"
        })
    }
    catch (e) {
        console.log(e);
    }
}

export const singleUserPostCount = async (req, res) => {
    try {
        const posts = await UserPosts.find({ email: req.params.email });
        if (posts.length > 0 || posts.length == 0) {
            return res.status(200).json({
                status: true,
                postCount: posts.length
            })
        }
        return res.status(404).json({
            status: false,
            message:"User not found"
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}

export const addPost = async (req, res) => {
    const { postText, postImgUrl, posterEmail } = req.body;
    const isEmail = await users.findOne({ email: posterEmail });
    try {
        if (!postText || isEmail.email != posterEmail) {
            return (
                res.status(400).json({
                    status: false,
                    message: "feilds are missing or Invalid Email"
                }))
        }
        let doc = new UserPosts({
            text: postText,
            postUrl: postImgUrl,
            email: posterEmail
        })
        await doc.save();
        return res.status(200).json({
            status: true,
            message: "Posted successfully",
        })

    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}

export const deleteAllPosts = async (req, res) => { }

export const deleteSinglePost = async (req, res) => { }