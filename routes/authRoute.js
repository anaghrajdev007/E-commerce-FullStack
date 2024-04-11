const express = require('express');
const router = express.Router();
const auth_controller = require("../controllers/authController");
const auth_validator = require("../middlewares/authMiddleware");
//REGESTER || POST
router.post('/regester', auth_controller.registerController);


//LOGIN CONTROLLER || POST
router.post('/login', auth_controller.loginController);

//PROTECTED ROUTE AUTH
router.get('/user-auth', auth_validator.requireSignIn, (req, res)=>{
    res.status(200).send({ok: true});
})



module.exports = router