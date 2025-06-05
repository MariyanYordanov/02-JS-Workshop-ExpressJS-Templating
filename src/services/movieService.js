import Movie from '../models/Movie.js';

// object method notation
export default {
    async getAllMovies(filter = {}) {
        let result = await Movie.find({});;

        if (filter.title) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
        }
        if (filter.genre) {
            result = result.filter(movie => movie.genre.localeCompare(filter.genre, undefined, { sensitivity: 'base' }) === 0);
        }
        if (filter.releaseYear) {
            result = result.filter(movie => movie.releaseYear === Number(filter.releaseYear));
        }
        return result;
    },
    createMovie(movieData) {
        const movie = new Movie({...movieData});
        return movie.save();
    },
    async getMovieById(movieId) {
        const movie = await Movie.findById(movieId);;
        if (!movie) {
            throw new Error(`Movie with id ${movieId} not found`);
        }
        return movie;
    },
    async attachCastMember(movieId, castId){
        const movie = await this.getMovieById(movieId);
        movie.casts.push(castId);
        return movie.save();
    }
} 