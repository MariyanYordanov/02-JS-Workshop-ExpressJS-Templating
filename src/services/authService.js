import User from '../models/User.js';

function logout() {

}

async function register(userData) {
   return User.create(userData)
       .then(user => {
           return user;
       })
       .catch(err => {
           throw new Error(`Registration failed: ${err.message}`);
       });
}

async function login(params) {
    
}

export default {
    register,
    login,
    logout
};