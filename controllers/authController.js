import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BAD_REQUEST , UNAUTHORIZED_USER } from "../errors/index.js";
import attachCookie from "../utils/attachCookies.js";

const register = async (req, res, next)=>{
    const {name, password, email} = req.body;

    if(!name || !email || !password){
        throw new BAD_REQUEST("Please provide all values.")
    }
    
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        throw new BAD_REQUEST("Email already in use.");
    }

    const user = await User.create({name, password, email});

    const token = user.createJWT();

    attachCookie({res, token});

    res.status(StatusCodes.CREATED).json({
        user:{
            name, 
            email, 
            lastName: user.lastName, 
            location: user.location,
        }, 
        location: user.location,
    });
}

const login = async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new BAD_REQUEST("Please enter all values");
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw new UNAUTHORIZED_USER("Invalid Credential");
    }
    // console.log(user);

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UNAUTHORIZED_USER("Incorrect Password");
    }

    const token = user.createJWT();
    user.password = undefined;

    attachCookie({res, token});

    res.status(StatusCodes.OK).json({user, location: user.location});
}

const updateUser = async (req, res)=>{
    const {email, name, lastName, location} = req.body;

    if(!email || !name || !lastName || !location){
        throw new BAD_REQUEST("Please Enter all values!");
    }
    const user = await User.findOne({_id: req.user.userId});
    user.name = name;
    user.email = email;
    user.lastName = lastName;
    user.location = location;
    await user.save();

    const token = user.createJWT();
    attachCookie({res, token});
    
    res.status(StatusCodes.OK).json({
        user, location
    });
}

const getCurrentUser = async (req, res)=>{
    const user = await User.findOne({_id: req.user.userId});
    res.status(StatusCodes.OK).json({user, location: user.location});
}

const logoutUser = async (req, res)=>{
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({msg: "Logged out user successful"}); 
}
export {register , login, updateUser, getCurrentUser, logoutUser};