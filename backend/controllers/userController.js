import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// completed logic (working)
export const register = async(req,res)=> {
    try {
        const {fullName,username,email,password,confirmPassword, gender} = req.body;
        // console.log("req body: ",req.body);
        if(!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({message:"All fields are required"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message:"Password do not match"});
        }

        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({message:"Udsername already exists!"});
        }

        const score=0;
        const hashedPassword = await bcrypt.hash(password,10);
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        await User.create({
            fullName, username, email, password:hashedPassword, 
            profilePhoto: gender==="male" ? maleProfilePhoto : femaleProfilePhoto ,
            gender, score
        });
        return res.status(201).json({
            message:"Account created successfully.",
            success:true
        })
    } catch(err) {
        console.log(err);
    }
};

// completed logic (working)
export const login = async(req,res) => {
    try{
        const {username,password} = req.body;
        // console.log("req body: ",req.body);
        if(!username || !password) {
            return res.status(400).json({message:"All fields are required"});
        };

        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };
        const tokenData={
            userId:user._id
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn:'1d'});

        return res.status(200).cookie("token", token, {
            maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'
        }).json({
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            email:user.email,
            profilePhoto:user.profilePhoto,
            score:user.score
        });

    } catch(err) {
        console.log(err);
    }
}