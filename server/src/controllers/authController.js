import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';

function createToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt
  };
}

export async function loginUserController(req, res, next) {
  try {
    
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });
    
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account access has been disabled by an administrator' });
    }

    const token = jwt.sign(
      {id:user._id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    );

    user.lastLoginAt = new Date();
    await user.save();

    // console.log("===============SERVER_CHECKPOINT===============");

    res.cookie("token", token);    
    res.status(200).json({
      message:"User Logged In successfully!",
      //  token: createToken(user),
       user: publicUser(user) 
      });

  } catch (error) {
    next(error);
  }
}

export async function getMeController(req, res) {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    message:"User detail fetched successfully!",
    user:publicUser(user)
  });

  // res.json({ user: publicUser(req.user) });
}

export function logoutUserController(req, res){

  const token = req.cookies.token;

  res.clearCookie("token");

  res.status(200).json({
    message:"USER SUCCESSFULLY LOGGED OUT!"
  });

}
