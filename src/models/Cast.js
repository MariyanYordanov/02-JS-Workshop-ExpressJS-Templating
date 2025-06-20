import mongoose from "mongoose";

const validCharPattern = /^[a-zA-Z0-9\s]+$/;

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true,
        validate: [validCharPattern, 'Name must contain only English letters and digits are allow'],
        minlength: [5, 'Name must be at least 5 characters long.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: [1, 'Age canot be smaller than 1!'],
        max: [120, 'Age canot be larger than 120!']
    },
    born: {
        type: String,
        required: [true, 'Born date is required!'],
        minlength: [10, 'Born date must be at least 10 characters long.'],
    },
    // name in movie: {
    //     type: String,
    //     required: [true, 'Name in movie is required!'],
    //     trim: true
    // },
    imageUrl: {
        type: String,
        required: [true, 'ImageUrl is required!'],
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v); 
        //     },
        //     message: 'Invalid image URL format!'
        // }
    },
    // movies: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Movie',
    //     required: [true, 'At least one movie is required!']
    // }]
}, {
    timestamps: true
});

const Cast = mongoose.model('Cast', castSchema);
export default Cast;
