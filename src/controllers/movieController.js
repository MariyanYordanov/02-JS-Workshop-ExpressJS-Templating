import { Router } from 'express';
import movieService from '../services/movieService.js';
import castService from '../services/castService.js';

const movieController = Router();

// Movie create routes
movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    try {
        // Променяме 'genre' на 'genres' защото в модела полето се казва 'genres'
        req.body.genres = req.body.genres.split(',').map(g => g.trim());
        req.body.category = req.body.category.toLowerCase();
        req.body.releaseYear = Number(req.body.releaseYear);

        const newMovie = req.body;
        await movieService.createMovie(newMovie);

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
    res.render('search', { movies, filter });
});

// Movie details route
movieController.get('/:id/details', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieService.getMovieById(movieId);
    res.render('details', { movie });
});

// Movie attach routes
movieController.get('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const castMembers = await castService.getAllCastMembers({ exclude: movie.casts});
    res.render('cast-attach', { movie, castMembers });
});

movieController.post('/:movieId/cast-attach', async (req, res) => {
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

export default movieController;