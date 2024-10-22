const User = require("../models/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//register routes
const registerUser = async (req, res) => {
    const {username, email , password} = req.body
    console.log(req.body)

    try{
        //check if user already exists
        const user = await User.findOne({username})
        if(user) return res.status(400).json({message: 'User already exists'})


        //hash the password
        const hashPassword = await bcrypt.hash(password,10);

        //create a new user
        const newUser = new User({username, email, password: hashPassword})
        await newUser.save()

        res.json({message: 'User registered successfully'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}


//login routes
const loginUser = async(req,res)=>{
    const {username, password} = req.body

    try{
        //check if user exists
        const user = await User.findOne({username})
        if(!user) return res.status(400).json({message: 'User not found'})


        //check if password is correct
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message: 'Invalid password'})


        //generate a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token})
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server error')
    }
}

module.exports = {registerUser, loginUser}