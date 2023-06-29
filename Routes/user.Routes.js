const { userModel } = require('../Model/user.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');


const userRouter = express.Router();


userRouter.post('/register', async (req, res) => {

    try {
        let { fname, lname, email, password } = req.body;
        let user = await userModel.find({ email });
        if (user.length > 0) {
            return res.status(400).json({msg:"User already exists"});
        }
        let pass = await bcrypt.hash(password, 10);
        password = pass;

        let newUser = new userModel({ fname, lname, email, password });
        await newUser.save();
        res.status(201).json({msg:"User Registered"});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error.message});
    }

})

userRouter.post('/login', async (req, res) => {

    try {
        let { email, password } = req.body;
        let user = await userModel.find({ email });

        if (user.length == 0) {
            return res.status(400).json({msg:"User does not exist"});
        }

        let result = await bcrypt.compare(password, user[0].password);
        if (!result) {
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        let token = jwt.sign({ user_id: user[0]._id }, process.env.SECRET_KEY, { expiresIn: "2h" });
        res.status(200).json({ token: token,msg:"User Successfully login" });

    } catch (error) {
        res.status(500).json({msg:error.message});
    }
})


module.exports = { userRouter }