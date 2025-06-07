import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

// Home route
homeController.get("/", async (req, res) => {
    const movies = await movieService.getAllMovies();
    res.render('home', { movies });
});

// About route
homeController.get("/about", (req, res) => {
    res.render('about');
});

export default homeController;