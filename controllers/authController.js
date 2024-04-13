const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken');

const registerController = async(req, res) =>{
    try{
        const {name,email, password , phone , address,answer} = req.body;
        //Validation
        if(!name || !email || !password || !phone || !address || !answer){
            return res.send({message:"All Fields are Manandatory"});
        }
        //Existing User Check

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message:"Already regestered, Please Login"
            })
        }
        //Regester User
        const hashedPassword = await hashPassword(password)
        const user =await new userModel({name,email, phone, address, password:hashedPassword,answer}).save();
        res.status(200).send({success: true, message:"User Regestered Successfully", user});
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: "Error in Regestration",
            err
        })
    }
}

//LOGIN
const loginController = async(req, res) =>{
    try{
        const {email, password} = req.body
        //Validation
        if(!email ||!password){
            return res.status(404).send({
                success: false,
                message:"Bahut tej ban rhe ho, hu hu"
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if (!user){
            return res.status(404).send({
                success: false,
                message:"User Not Found"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success:true,
                message:"Email or Password mismatch"
            })
        }
        //Token
        const token = await JWT.sign({_id: user._id},process.env.JWT_SECRET, {expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"LoggedIn Successfully",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone
            },
            token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            err
        })
    }
}

// FORGOT PASSWORD CONTROLLER
const forgotPasswordController = async(req, res) =>{
    try{
        const {email, answer, newPassword} = req.body;
        if(!email){
            res.status(400).send({message:"Email is required"})
        }
        if(!answer){
            res.status(400).send({message:"Auth answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"})
        }
        //Check
        const user = await userModel.findOne({email,answer})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({message:"Password updated successfully"})
    }
    catch(err){
        res.status(500).send({
            success: false,
            message: "Error in forgotPasswordController",
            err
    })
}
}


module.exports = {
    registerController,
    loginController,
    forgotPasswordController
}