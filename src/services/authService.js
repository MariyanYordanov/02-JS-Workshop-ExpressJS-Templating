import User from '../models/User.js';
import bcrypt from 'bcryptjs';

function logout() {

}

async function register(email, password, rePassword) {
    return User.create(email, password, rePassword)
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
    return user;
}

export default {
    register,
    login,
    logout
};