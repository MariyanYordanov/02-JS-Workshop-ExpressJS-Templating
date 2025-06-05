import Cast from "./models/Cast.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

async function seedCast() {
    await connectDB();

    /*
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
    // }] */

    const castMembers = [
        {
            name: "Robert Downey Jr.",
            age: 58,
            born: new Date("1965-04-04"),
            imageUrl: "https://example.com/robert-downey-jr.jpg"
        },
        {
            name: "Scarlett Johansson",
            age: 38,
            born: new Date("1984-11-22"),
            imageUrl: "https://example.com/scarlett-johansson.jpg"
        },
        {
            name: "Chris Hemsworth",
            age: 40,
            born: new Date("1983-08-11"),
            imageUrl: "https://example.com/chris-hemsworth.jpg"
        },
        {
            name: "Tom Hiddleston",
            age: 42,
            born: new Date("1981-02-09"),
            imageUrl: "https://example.com/tom-hiddleston.jpg"
        },
        {
            name: "Mark Ruffalo",
            age: 56,
            born: new Date("1967-11-22"),
            imageUrl: "https://example.com/mark-ruffalo.jpg"
        }
    ];

    try {
        await Cast.insertMany(castMembers);
        console.log("Cast members seeded successfully");
    } catch (error) {
        console.error("Error seeding cast members:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedCast().catch(err => {
    console.error("Error in seeding cast:", err);
});