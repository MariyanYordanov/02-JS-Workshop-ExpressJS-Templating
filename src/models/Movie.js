import mongoose from "mongoose";

const maxYearAllowed = new Date().getFullYear() + 5; // Allow up to 5 years in the future
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Title is required!'],
        trim: true
    },
    category: {
        type: String,
        required: [true,'Category is required!'],
        enum: ['movie', 'tv-show', 'documentary', 'animation', 'short-film'],
        default: 'movie',
    },
    genres: {
        type: [String],
        required: [true,'Genres is required!'],
        validate: {
            validator: function (v) {
                return v.length > 0;
            },
            message: 'At least one genre is required.'
        }
    },
    director: {
        type: String,
        required: [true,'Director is required!'],
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1888, // The year the first film was made
        max: [maxYearAllowed, `Year canot be larger than ${maxYearAllowed}!`] // Current year
    },
    imageUrl: {
        type: String,
        required: [true,'ImageUrl is required!'],
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
        //     },
        //     message: 'Invalid image URL format!'
        // }
    },
    rating: {
        type: Number,
        required: [true,'Rating is required!'],
        min: 0,
        max: 10
    }, 
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'Description is to long!'] // Optional: limit description length
    },
    casts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cast',
    }]
}, {
    timestamps: true 
}); 

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
