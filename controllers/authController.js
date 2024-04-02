const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const JWT = require('jsonwebtoken');

const registerController = async(req, res) =>{
    try{
        const {name,email, password , phone , address} = req.body;
        //Validation
        if(!name || !email || !password || !phone || !address){
            return res.send({error:"All Fields are Manandatory"});
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
        const user =await new userModel({name,email, phone, address, password:hashedPassword}).save();
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



module.exports = {
    registerController,
    loginController
}