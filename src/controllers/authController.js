import { Router } from "express";
import authService from "../services/authService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

// User registration route
authController.get("/register", (req, res) => {
    res.render("register", { pageTitle: "Register" });
});

authController.post("/register", async (req, res) => {
    const { email, password, rePassword } = req.body;
    try {
        const token = await authService.register(email, password, rePassword);
        res.cookie('auth', token);
        console.log("User registered successfully");
        res.redirect("/");
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        res.status(400).render("register", {
            error: errorMessage,
            email,
            pageTitle: "Register"
        });
    }
});

// User login route
authController.get("/login", (req, res) => {
    res.render("login", { pageTitle: "Login" });
});

authController.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        res.cookie('auth', token);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(400).render("login", {
            error: err.message,
            email: req.body.email,
            pageTitle: "Login"
        });
    }
});

// User logout route
authController.get("/logout", (req, res) => {
    authService.logout(req, res);
    res.redirect("/");
});

export default authController;