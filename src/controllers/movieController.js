import { Router } from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import getCategoryOptionsViewData from '../utils/movieUtils.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const movieController = Router();

// Movie create routes
movieController.get('/create', isAuthenticated, (req, res) => {
    const categories = getCategoryOptionsViewData();
    res.render('create', { pageTitle: 'Create', categories });
});

movieController.post('/create', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.id;
        const newMovie = req.body;
        await movieService.createMovie(newMovie, userId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid movie data', err.message);
    }
});

// Movie search route
movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);
    res.render('search', { movies, filter, pageTitle: 'Search' });
});

// Movie details route
movieController.get('/:id/details', async (req, res) => {
    const movieId = req.params.id;
    const userId = req.user?.id;
    const movie = await movieService.getMovieById(movieId);
    const isCreator = movie.creator?.equals(userId);
    res.render('details', { movie, isCreator, pageTitle: 'Details' });
});

// Movie attach routes
movieController.get('/:movieId/cast-attach', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const castMembers = await castService.getAllCastMembers({ exclude: movie.casts});
    res.render('cast-attach', { movie, castMembers, pageTitle: 'Attach' });
});

movieController.post('/:movieId/cast-attach', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.castId;
    try {
        await movieService.attachCastMember(movieId, castId);
        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error attaching cast member', err.message);
    }
});

// Movie delete route
movieController.get('/:id/delete', isAuthenticated, async (req, res) => {
    const movieId = req.params.id;
    const isCreator = req.user?.id === (await movieService.getMovieById(movieId)).creator.toString();
    if (!isCreator) {
        return res.status(403).send('You are not authorized to delete this movie');
    }
    try {
        await movieService.deleteMovie(movieId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Error deleting movie', err.message);
    }
});

// Movie edit routes
movieController.get('/:id/edit', isAuthenticated, async (req, res) => {
    const movieId = req.params.id;
    if (!movieId) {
        return res.status(404).send('Movie not found');
    }
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send('You must be logged in to edit a movie');
    }
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    const isCreator = movie.creator?.equals(userId);
    if (!isCreator) {
        return res.status(403).send('You are not authorized to edit this movie');
    }
    const categoryViewData = getCategoryOptionsViewData(movie.category);
    res.render('edit', { movie, categories: categoryViewData, pageTitle: 'Edit'});
});

movieController.post('/:id/edit', isAuthenticated, async (req, res) => {
    const movieId = req.params.id;
    if (!movieId) {
        return res.status(404).send('Movie not found');
    }
    const movieData = req.body;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).send('You must be logged in to edit a movie');
    }
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    const isCreator = movie.creator?.equals(userId);
    if (!isCreator) {
        return res.status(403).send('You are not authorized to edit this movie');
    }
    try {
        await movieService.update(movieId, movieData);
        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error updating movie', err.message);
    }
});


export default movieController;