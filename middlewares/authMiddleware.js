const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');


//protected Routes token based

const requireSignIn = async (req, res, next) =>{
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next()
    }
    catch(err){
        console.log(err);
    }

}

//admin access
const isAdmin = async(req, res, next) =>{
    try{
        const user = await userModel.findById(req.user._id)
        if(user.role !== 1){
            return res.status(403).send({
                success: false,
                message: "Unauthorized Access"
            })

        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(403).send({
            success: false,
            message: "Unauthorized Access for Admin"
        })
    }
}



module.exports ={
    requireSignIn,
    isAdmin
}