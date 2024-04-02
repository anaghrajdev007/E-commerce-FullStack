const express = require('express');
const router = express.Router();
const auth_controller = require("../controllers/authController");

//REGESTER || POST
router.post('/regester', auth_controller.registerController);


//LOGIN CONTROLLER || POST
router.post('/login', auth_controller.loginController);



module.exports = router