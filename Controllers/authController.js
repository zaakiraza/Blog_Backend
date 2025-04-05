import users from '../Models/users.js'

export const signupController = async (req, res) => {
    const { signupName, signupEmail, signupImgURL, signUpDes, signupPassword } = req.body;
    try {
        if (!signupName || !signupEmail || !signupPassword) {
            return res.status(404).json({
                status: false,
                message: "Missing Feilds"
            })
        }
        const dbEmails = await users.findOne({ email: signupEmail });
        if (dbEmails) {
            res.status(400).json({
                status: false,
                message: "already present in db"
            })
        }
        else {
            let doc = new users({
                name: signupName,
                email: signupEmail,
                imgUrl:signupImgURL,
                description:signUpDes,
                password: signupPassword,
            })
            await doc.save();
            return res.status(200).json({
                status: true,
                message: "User signedUp successfully",
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
            if (userData.password == loginPassword) {
                res.status(200).json({
                    status: true,
                    message: "Login Successfully",
                    data: userData
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
            message: e
        })
    }
}

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
                const updateResult = await users.updateOne({ email: resetEmail }, { $set: { password: confirmPassword } }, { runValidators: true });
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