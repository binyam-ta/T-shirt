import { ne } from "drizzle-orm";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Optionally extend Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: Number;
      role?: string;
    }
  }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'jwtSecretio')as { id: number; role: string };
      console.log("Decoded token:", decoded); 
    if (typeof decoded !== 'object' || !decoded?.id || !decoded?.role) {

     res.status(401).json({ message: 'Invalid token' });
      return ;
    }
   
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error("JWT Error:", error); 
    return res.status(401).json({ message: 'Access denied' });
  }
}


export function verifyseller(req: Request, res: Response, next: NextFunction) {

 const role = req.role;
console.log("Role:", role);
  if (role !== 'seller') {
    res.status(403).json({ message: 'No token provided' });
    return ;
  }
next();
}
  