import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../config/secret.js';

async function register(email, password, rePassword) {
   // Проверка за паролите
    if (password !== rePassword) {
        throw new Error('Passwords do not match');
    }

    // Проверка за съществуващ потребител
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const user = await User.create({ email, password });
    const token = generateToken(user);
    console.log("User registered successfully");
    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid password');
    }

    const token = generateToken(user);
    return token;
}

function logout(req, res) {
    res.clearCookie('auth');
    res.locals.user = null;
    req.user = null;
    console.log("User logged out successfully");
}

function generateToken(user) {
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
}

export default {
    register,
    login,
    logout
};