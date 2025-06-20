import { Router } from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';
import getCategoryOptionsViewData from '../utils/movieUtils.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { get } from 'mongoose';

const movieController = Router();

// Movie create routes - само за логнати
movieController.get('/create', isAuthenticated, (req, res) => {
    const categories = getCategoryOptionsViewData();
    res.render('create', { categories, pageTitle: 'Create' });
});

movieController.post('/create', isAuthenticated, async (req, res) => {

    const userId = req.user?.id;
    const newMovie = req.body;

    if (!userId) {
        return res.redirect('/auth/login');
    }

    try {
        
        await movieService.createMovie(newMovie, userId);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            error: getErrorMessage(err),
            movie: newMovie
        });
    }
});

// Movie search route
movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);
    res.render('search', { movies, ...filter }); // spread filter за запазване на търсените стойности
});

// Movie details route
movieController.get('/:id/details', async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.user?.id;
        const movie = await movieService.getMovieById(movieId);
        const isCreator = movie.creator?.equals(userId);
        res.render('details', { movie, isCreator });
    } catch (err) {
        console.error(err);
        res.status(404).render('404');
    }
});

// Movie attach routes
movieController.get('/:movieId/cast-attach', isAuthenticated, async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await movieService.getMovieById(movieId);
        const castMembers = await castService.getAllCastMembers({ exclude: movie.casts });
        res.render('cast-attach', { movie, castMembers });
    } catch (err) {
        console.error(err);
        res.status(404).render('404');
    }
});

movieController.post('/:movieId/cast-attach', isAuthenticated, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.castId;
    try {
        await movieService.attachCastMember(movieId, castId);
        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        console.error(err);
        res.redirect(`/movies/${movieId}/cast-attach`);
    }
});

// Movie delete route
movieController.get('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await movieService.getMovieById(movieId);
        const isCreator = movie.creator?.equals(req.user?.id);

        if (!isCreator) {
            return res.status(403).render('404');
        }

        await movieService.deleteMovie(movieId);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).render('404');
    }
});

// Movie edit routes
movieController.get('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            return res.redirect('/auth/login');
        }

        const movie = await movieService.getMovieById(movieId);
        const isCreator = movie.creator?.equals(userId);

        if (!isCreator) {
            return res.status(403).render('404');
        }

        res.render('edit', {
            movie,
            categories: getCategoryOptionsViewData(movie.category),
            pageTitle: 'Edit'
        });
    } catch (err) {
        console.error(err);
        res.status(404).render('404');
    }
});

movieController.post('/:id/edit', isAuthenticated, async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.user?.id;

        if (!userId) {
            return res.redirect('/auth/login');
        }

        const movie = await movieService.getMovieById(movieId);
        const isCreator = movie.creator?.equals(userId);

        if (!isCreator) {
            return res.status(403).render('404');
        }

        await movieService.update(movieId, req.body);
        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        console.error(err);
        res.render('edit', {
            errors: [err.message],
            movie: { ...req.body, _id: req.params.id }
        });
    }
});

export default movieController;