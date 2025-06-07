import jwt from 'jsonwebtoken';
import { secret } from '../config/secret.js';

export const auth = (req, res, next) => {
    const token = req.cookies.auth;
    if(!token) {
        return next();
    }
    try {
        const decoded = jwt.verify(token, secret);
        //req.user = decoded; // Attach user info to request object

        next();
    } catch (err) {
        console.error("Invalid token:", err);
        res.clearCookie('auth'); 
        res.redirect('/auth/login');
    }
}