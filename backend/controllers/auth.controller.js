import gentoken from "../config/gentoken.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signUp= async(req,res)=>{
    try{
        const {name,email,password}= req.body

        const existemail= await User.findOne({email})
        if(existemail){
            return res.status(400).json({message:"Email already exists"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const hashedPassword=  await bcrypt.hash(password,10)

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly : true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        return res.status(201).json({message:"User created successfully",user})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error", error:error.message})
    }
}

export const login= async(req,res)=>{
    try{
        const {email,password}= req.body

        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Email doesn't exists"})
        }

        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = await gentoken(user._id)
        res.cookie("token",token,{
            httpOnly : true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        return res.status(200).json({message:"User logged in successfully",user})
    }
    catch(error){
        return res.status(500).json({message:"Internal server error", error:error.message})
    }
}

export const logout= async(req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"User logged out successfully"})
    }
    catch(error){
        return res.status(500).json({message:"logout error", error:error.message})
    }
}