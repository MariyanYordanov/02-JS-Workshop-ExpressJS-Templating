import { Router } from "express";

const homeController = Router();

// Home route
homeController.get("/", (req, res) => {
    res.render('home');
});

// About route
homeController.get("/about", (req, res) => {
    res.render('about');
});

export default homeController;