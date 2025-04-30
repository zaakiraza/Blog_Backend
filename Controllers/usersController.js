import users from "../Models/users.js";
import { genSalt, hash} from 'bcrypt'

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find({}, '-password');
        return res.status(200).json({
            status: true,
            message: "All users data",
            data: allUsers
        })
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}

export const getSingleUserByEmail = async (req, res) => {
    const findEmail = req.params.email;
    try {
        const isEmail = await users.findOne({ email: findEmail }, '-password -createdAt -updatedAt');
        if (!isEmail) {
            res.status(404).json({
                status: false,
                message: "User not found",
            })
        }
        else {
            res.status(200).json({
                status: true,
                message: "User found",
                data: isEmail
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

export const getSingleUserByName = async (req, res) => {
    const findName = req.params.name;
    try {
        let isName = await users.findOne({ name: findName });
        if (isName) {
            return  res.json({
                status: false,
                message: "Name already taken"
            });
        }
        res.status(200).json({
            status: true,
            message: "Name Doen't exist"
        })
    }
    catch (error) {
        res.status(400).json({
            status: false,
            message: error
        })
    }
}

export const deleteUser = async (req, res) => {
    const currentEmail = req.params.email;
    try {
        const deleteResult = await users.deleteOne({ email: currentEmail })
        console.log(deleteResult)
        if (deleteResult.deletedCount == 0) {
            res.status(404).json({
                status: false,
                message: "user not found"
            })
        }
        else {
            res.status(200).json({
                status: true,
                message: "user deleted successfully"
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

export const deleteAllUsers = async (req, res) => { }


export const changePassword = async (req, res) => {
    const { resetEmail, resetPassword, confirmPassword } = req.body;
    try {
        const userData = await users.findOne({ email: resetEmail });
        if (!userData) {
            res.status(404).json({
                status: false,
                message: "Email doesn't exist"
            })
        }
        else {
            if (userData.password != resetPassword) {
                res.status(400).json({
                    status: false,
                    message: "Wrong Password"
                })
            }
            else {
                const salt = await genSalt(10);
                const updateResult = await users.updateOne({ email: resetEmail }, { $set: { password: await hash(confirmPassword, salt) } }, { runValidators: true });
                res.status(200).json({
                    status: true,
                    message: "Password Updated"
                })
            }
        }
    }
    catch (e) {
        res.status(400).json({
            status: false,
            message: e
        })
    }
}

export const updateUser = async (req, res) => {
    let requestedEmail = req.params.email;
    const { updatedName, updatedDes, updatedImgURL } = req.body;
    try {
        const userData = await users.findOneAndUpdate(
            { email: requestedEmail },
            {
                $set: {
                    name: updatedName,
                    description: updatedDes,
                    imgUrl: updatedImgURL
                }
            },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", userData });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}