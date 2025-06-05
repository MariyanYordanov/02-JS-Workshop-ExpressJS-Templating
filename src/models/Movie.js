import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['movie', 'tv-show', 'documentary', 'animation', 'short-film'],
        default: 'movie',
    },
    genres: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one genre is required.'
        }
    },
    director: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }, 
    description: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true 
}); 

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;