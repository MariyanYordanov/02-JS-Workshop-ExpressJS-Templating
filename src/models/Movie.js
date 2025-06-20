import mongoose from "mongoose";

const maxYearAllowed = new Date().getFullYear() + 5; // Allow up to 5 years in the future
// validator for english and digits and white space
const validCharPattern = /^[a-zA-Z0-9\s]+$/;

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Title is required!'],
        trim: true,
        validate: [validCharPattern, 'Title must contain only English letters and digits are allow'],
        minlength: [5, 'Title must be at least 5 characters long.'],
    }
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
        },
        lowercase: true,
        validate: [validCharPattern, 'Title must contain only English letters and digits are allow'],
        minlength: [5, 'Title must be at least 5 characters long.'],
    },
    director: {
        type: String,
        required: [true,'Director is required!'],
        trim: true,
        validate: [validCharPattern, 'Title must contain only English letters and digits are allow'],
        minlength: [5, 'Title must be at least 5 characters long.'],
    },
    releaseYear: {
        type: Number,
        required: true,
        min: [1900, 'Year canot be smaller than 1900!'] // The year the first film was made
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
        minlength: [20, 'Description must be at least 20 characters long.'],
        validate: [validCharPattern, 'Title must contain only English letters and digits are allow'],
    },
    casts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cast',
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required!']
    }
}, 
{
    timestamps: true 
}); 

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
