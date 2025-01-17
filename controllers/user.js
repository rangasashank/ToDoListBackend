import { User } from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { sendCookie } from "../utils/features.js";

export const login = async(req,res,next) => {
    const {email, password} = req.body;


    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email/Password",
        })}
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
    return res.status(404).json({
        success: false,
        message: "Invalid Email/Password",
    })}

    sendCookie(user, res,`Welcome Back ${user.name}`, 200)

}

export const getAllUsers = async(req,res) => {

}

export const logout = async(req,res,next) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        success: true,
        user: req.user,
    })
}

export const register = async(req,res) => {
    const {name, email, password} = req.body;
    let user = await User.findOne({email});

    if(user) {
        return res.status(404).json({
            success: false,
            message: "User Already Exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password,10)
    user = await User.create({name,email,password: hashedPassword})

    sendCookie(user,res,"Registered Succesfully", 201)

}


export const getMyProfile =(req,res) => {


    res.status(200).json({
        success: true,
        user: req.user,
    })

}


