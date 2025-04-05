import users from "../Models/users.js";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        res.status(200).json({
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

export const getSingleUser = async (req, res) => {
    const findEmail = req.params.email;
    try {
        const isEmail = await users.findOne({ email: findEmail });
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

export const deleteUser = async (req, res) => {
    const currentEmail = req.params.email;
    try{
        const deleteResult = await users.deleteOne({ email: currentEmail })
        // const deleteResult = await users.deleteOne({ currentEmail });
        console.log(deleteResult)
        if(deleteResult.deletedCount == 0){
            res.status(404).json({
                status:false,
                message:"user not found"
            })
        }
        else{
            res.status(200).json({
                status:true,
                message:"user deleted successfully"
            })
        }
    }
    catch(e){
        res.status(400).json({
            status:false,
            message:e
        })
    }
}