import { config } from 'dotenv';
import users from '../Models/users.js';
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken';
import { genSalt, hash, compare } from 'bcrypt'

dotenv.config();

export const checkForAlreadyPresentEmail = async (req, res) => {
    const signupEmail = req.params.email;
    try {
        if (!signupEmail) {
            return res.status(400).json({
                status: false,
                message: "Email is Missing"
            })
        }
        const dbEmails = await users.findOne({ email: signupEmail });
        if (!dbEmails) {
            return res.status(200).json({
                status: true,
                message: "Email not found"
            })
        }
        else {
            res.status(200).json({
                status: false,
                message: "Account From this email is already present"
            })
        }
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

export const signupController = async (req, res) => {
    const { signupName, signupEmail, signupImgURL, signUpDes, signupPassword } = req.body;
    try {
        if (!signupName || !signupEmail || !signupPassword) {
            return res.status(404).json({
                status: false,
                message: "Feilds are Missing"
            })
        }
        const salt = await genSalt(10);
        let doc = new users({
            name: signupName,
            email: signupEmail,
            imgUrl: signupImgURL,
            description: signUpDes,
            password: await hash(signupPassword, salt)
        })
        await doc.save();
        return res.status(200).json({
            status: true,
            message: "User signedup successfully",
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

export const loginController = async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
    try {
        const userData = await users.findOne({ email: loginEmail });
        if (!userData) {
            res.status(404).json({
                status: false,
                message: "User Not Found"
            })
        }
        else {
            const isValid = await compare(loginPassword, userData.password)
            if (isValid) {
                const token = JWT.sign({
                    _id: userData?._id,
                    email: userData?.email
                }, process.env.JWTSECRET);
                res.status(200).json({
                    status: true,
                    message: "Login Successfully",
                    data: token
                })
            }
            else {
                res.status(400).json({
                    status: false,
                    message: "Invalid UserName or Password"
                })
            }
        }
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e.message || "Something went wrong"
        })
    }
}

export const verifyToken = (req, res) => {
    let frontEndToken = req.params.token;
    try {
        if (!frontEndToken) {
            return res.status(404).json({
                status: false,
                message: "Token not found"
            })
        }
        const decode = JWT.verify(frontEndToken, process.env.JWTSECRET)
        return res.status(200).json({
            status: true,
            data: decode
        })
    }
    catch (e) {
        return res.status(400).json({
            status: false,
            message: e.message
        })
    }
}

export const forgetPassword = async (req, res) => { }