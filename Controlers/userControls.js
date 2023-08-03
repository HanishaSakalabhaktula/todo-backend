const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const createToken = (id) => {
    //jwt.sign(payload, secret, expiry date);
    return jwt.sign({_id: id}, process.env.SECRET);
}

//login user
const authenticateUser = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        //400: bad request
        return res.status(400).json({error: 'All fields mandatory'});
    }

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(400).json({error: 'Incorrect Username or Password'});
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        //401 : unauthorised
        return res.status(401).json({error: 'Incorrect Username or Password'});
    }

    try {
        //valid user
        const id = user._id;

        //create a token
        const token = createToken(id);

        //send token in a cookie
        res.cookie("token", token, {httpOnly : true}).send();

        // res.status(200).json({id, token});
    } catch (e) {
        res.status(400).json({error: e.message});
    }
}

const createUser = async (req, res) => {
    const {username, email, password, confirm_password} = req.body;
    if(!username || !email || !password || !confirm_password){
        return res.status(400).json({error: 'All fields Mandatory!'});
    }

    if(password !== confirm_password){
        return res.status(400).json({error: 'Password and Confirm Password must be same'});
    }
    
    //validating email
    if(!validator.isEmail(email)){
        return res.status(400).json({error: 'Invalid Email'});
    }

    //avoid duplicate emails
    const exists = await User.findOne({email});
    if(exists){
        return res.status(400).json({error: 'User already exists'});
    }

    //all clear you can now create a new user
    try {

        //hashing the passwords for security purpose
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({username, email, password: hashPassword, confirm_password: hashPassword});
        res.status(200).json({message: "User created successfully!"});
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
}

//logout 
const logoutUser = async (req, res) => {
    //send an empty cookie with token that is already expired
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)//1970's date
    }).send();
    // res.status(200).json({message: "Logged out successfully"});
}
module.exports = {authenticateUser, createUser, logoutUser};