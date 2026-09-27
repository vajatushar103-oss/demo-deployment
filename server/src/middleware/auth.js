import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../config/env.js';


export async function authUser(req, res, next) {
  try {
    // const header = req.headers.authorization || '';
    // const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    const token = req.cookies.token;
    
    // console.log(token);
    
    if (!token){ 
      return res.status(401).json({
        message: 'Authentication required' 
      })
    };
    
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    
    if (!user) return res.status(401).json({ message: 'User account not found' });
    if (!user.isActive) return res.status(403).json({ message: 'Your account access has been disabled' });
    
    // console.log("===============SERVER_authUser_MIDDLEWARE===============");
    req.user = user;
    // req.user = payload;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Session expired or invalid. Please log in again.' });
    }
    next(error);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {

    
    if (!req.user) return res.status(401).json({ message: 'Authentication required' });
    
    // const realUser = getUser(req.user.id);
    
    // console.log("=========================SERVER_CHECKPOINT========================= user.id: " + req.user.id);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    
    next();

  };
}

const getUser = async (id) =>{ await User.findById(id);}