import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../config/secret.js';

async function register(email, password, rePassword) {

    return User.create({ email, password, rePassword })
        .then(user => {
            return user;
        })
        .catch(err => {
            throw new Error(`Registration failed: ${err.message}`);
        });
}

async function login(email, password) {

    const user = await User.findOne({ email });
    if (!user) {
        return new Error('User not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return new Error('Invalid password');
    }

    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return token;
}

function logout(req, res) {
    res.clearCookie('auth');
    res.locals.user = null;
    req.user = null;
    console.log("User logged out successfully");
}

export default {
    register,
    login,
    logout
};