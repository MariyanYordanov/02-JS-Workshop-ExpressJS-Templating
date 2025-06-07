import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

// User registration route
authController.get("/register", (req, res) => {
    res.render("register");
});

authController.post("/register", async (req, res) => {
    try {
        const { email, password, rePassword } = req.body;
        await authService.register(email, password, rePassword);
        res.redirect("/auth/login");
    } catch (err) {
        console.error(err);
        res.status(400).send("Invalid registration data", err.message);
    }
});

// User login route
authController.get("/login", (req, res) => {
    res.render("login");
});

authController.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        if (token) {
            res.cookie('auth', token);
            res.redirect("/");
        } else {
            res.status(401).send("Invalid username or password");
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Login failed", err.message);
    }
});

// User logout route
authController.get("/logout", (req, res) => {
    res.clearCookie('auth');
    res.locals.user = null; 
    req.user = null; 
    console.log("User logged out successfully");
    res.redirect("/");

});

export default authController;
