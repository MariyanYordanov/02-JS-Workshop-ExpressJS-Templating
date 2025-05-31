import { Router } from "express";

const movieController = Router();

// Movie create route
movieController.get("/movies/create", (req, res) => {
    res.render('create');
});

// Movie details route
movieController.get("/:id", (req, res) => {
    const movieId = req.params.id;
    // Here you would typically fetch the movie details from a service or database
    // For now, we'll just simulate it with a static object
    const movieDetails = {
        id: movieId,
        title: "Sample Movie",
        description: "This is a sample movie description.",
        releaseDate: "2023-01-01"
    };
    
    res.render('movieDetails', { movie: movieDetails });
});

export default movieController;