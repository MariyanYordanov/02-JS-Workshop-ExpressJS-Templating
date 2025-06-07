import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

// Home route
homeController.get("/", async (req, res) => {
    const movies = await movieService.getAllMovies();
    if (!movies) {
        return res.status(404).render('404', { title: 'Movies Not Found' });
    }
    console.log(req.user);
    
    res.render('home', { movies });
});

// About route
homeController.get("/about", (req, res) => {
    res.render('about');
});

export default homeController;