import mongoose from "mongoose";

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: 0
    },
    born: {
        type: Date,
        required: [true, 'Born date is required!']
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
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(v);
            },
            message: 'Invalid image URL format!'
        }
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
