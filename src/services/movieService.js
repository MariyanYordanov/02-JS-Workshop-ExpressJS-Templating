import Movie from '../models/Movie.js';

// object method notation
export default {
    getAllMovies(filter = {}) {
        let query = Movie.find();  
        if (filter.search) {
            query = query.find({ title: { $regex: new RegExp(filter.search, 'i') } } );
        }
        if (filter.genre) {
            query = query.find({genre: filter.genre.toLowerCase()} )
        }
        if (filter.releaseYear) {
            query = query.where('releaseYear').equals(filter.releaseYear);
        }
        return query;
    },
    createMovie(movieData, userId) {
        const processedData = {
            ...movieData,
            creator: userId,
            genres: typeof movieData.genres === 'string'
                ? movieData.genres.split(',').map(g => g.trim().toLowerCase())
                : movieData.genres,
            category: movieData.category.toLowerCase(),
            releaseYear: Number(movieData.releaseYear),
            rating: Number(movieData.rating)
        };
        const movie = new Movie(processedData);
        return movie.save();
    },
    async getMovieById(movieId) {
        const movie = await Movie.findById(movieId).populate('casts');
        if (!movie) {
            throw new Error(`Movie with id ${movieId} not found`);
        }
        return movie;
    },
    async attachCastMember(movieId, castId){
        const movie = await this.getMovieById(movieId);
        movie.casts.push(castId);
        return movie.save();
    },
} 