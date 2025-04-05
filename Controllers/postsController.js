import users from "../Models/users.js";
import UserPosts from "../Models/post.js"

export const getAllPosts = async (req, res) => {
    try {
        const allpost = await UserPosts.find();
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
                data: allpost
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

export const addPost = async (req, res) => {
    const { postText, postImgUrl, posterEmail, posterName, posterImgUrl } = req.body;
    const isEmail = await users.findOne({ email: posterEmail });
    try {
        if (!postText || isEmail.email != posterEmail || !posterName || !posterImgUrl) {
            res.status(400).json({
                status: false,
                message: "feilds are missing"
            })
        }
        else {
            let doc = new UserPosts({
                text: postText,
                postUrl: postImgUrl,
                email: posterEmail,
                name: posterName,
                ImgUrl: posterImgUrl
            })
            await doc.save();
            return res.status(200).json({
                status: true,
                message: "Posted successfully",
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

export const getPostCount = async (req, res) => {
    try {
        const posts = await UserPosts.find({ email: req.params.email });
        res.status(200).json({
            status: true,
            postCount: posts.length
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}