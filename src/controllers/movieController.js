import { Router } from 'express';
import movieService from '../services/movieService.js';

const movieController = Router();

// Movie create route
movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    await movieService.createMovie(newMovie);
    res.redirect('/');
});

// Movie search route
movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);
    res.render('search', { movies, filter });
});

// Movie details route
movieController.get('/:id/details', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);
    res.render('details', { movie });
});



export default movieController;