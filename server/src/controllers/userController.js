import bcrypt from 'bcryptjs';
import {User} from '../models/User.js';

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

export async function getUsers(req, res, next) {
  try {

    // console.log("=========================SERVER_CHECKPOINT=========================");
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({ users: users.map(publicUser) });
  } catch (error) {
    next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, password, role = 'staff' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (!['admin', 'staff'].includes(role)) {
      return res.status(400).json({ message: 'Role must be admin or staff' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must contain at least 8 characters' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: 'A user with this email already exists' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      isActive: true
    });

    res.status(201).json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {

    // console.log("=======================================START=======================================");
    // console.log("RAW PARAMS:", req.params);
    // console.log("RAW BODY:", req.body);    
    
    const { id } = req.params;
    const { name, email, role, isActive, password } = req.body;
    const user = await User.findById(id);

    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (user._id.equals(req.user._id)) {
      if (role && role !== user.role) {
        return res.status(400).json({ message: 'You cannot change your own role' });
      }
      if (isActive === false) {
        return res.status(400).json({ message: 'You cannot disable your own account' });
      }
    }
    
    if (role !== undefined && !['admin', 'staff'].includes(role)) {
      return res.status(400).json({ message: 'Role must be admin or staff' });
    }
    
    if (email !== undefined) {
      const normalizedEmail = String(email).trim().toLowerCase();
      const duplicate = await User.findOne({ email: normalizedEmail, _id: { $ne: id } });
      if (duplicate) return res.status(409).json({ message: 'A user with this email already exists' });
      user.email = normalizedEmail;
    }
    
    if (name !== undefined) user.name = String(name).trim();
    if (role !== undefined) user.role = role;
    if (isActive !== undefined) user.isActive = Boolean(isActive);
    
    if (password !== undefined && password !== '') {
      if (password.length < 8) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters' });
      }
      user.passwordHash = await bcrypt.hash(password, 12);
    }
    // console.log("=======================================CHECKPOINT=======================================");
    
    // console.log("USER BEFORE SAVE:", {
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   isActive: user.isActive
    // });

    await user.save();
    // console.log("=========================SERVER_CHECKPOINT=========================");
    // console.log("SERVER SENT USER: " + user);
    // console.log("=======================================FINISH=======================================");
    
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}
