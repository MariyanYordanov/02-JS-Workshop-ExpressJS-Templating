// seed movies to mongodb// This script connects to the MongoDB database and seeds it with a predefined list of movies.
// It uses the Mongoose library to interact with the database and the Movie model to insert the movie documents.import mongoose from "mongoose";
import Movie from "../src/models/Movie.js";
import connectDB from "../src/config/db.js";
import mongoose from "mongoose";

async function seedMovies() {
    await connectDB();

    const movies = [
        {
            title: "Interstellar",
            category: "Sci-Fi",
            genres: ["Adventure", "Drama", "Sci-Fi"],
            director: "Christopher Nolan",
            releaseYear: new Date("2014-11-07"),
            imageUrl: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
            rating: 8.6,
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
        },
        {
            title: "Fight Club",
            category: "Drama",
            genres: ["Drama"],
            director: "David Fincher",
            releaseYear: new Date("1999-10-15"),
            imageUrl: "https://m.media-amazon.com/images/I/81D+KJkO3-L._AC_SY679_.jpg",
            rating: 8.8,
            description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much more."
        },
        {
            title: "The Godfather",
            category: "Drama",
            genres: ["Crime", "Drama"],
            director: "Francis Ford Coppola",
            releaseYear: new Date("1972-03-24"),
            imageUrl: "https://m.media-amazon.com/images/I/71xBLRBYOiL._AC_SY679_.jpg",
            rating: 9.2,
            description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
        },
        {
            title: "Pulp Fiction",
            category: "Crime",
            genres: ["Crime", "Drama"],
            director: "Quentin Tarantino",
            releaseYear: new Date("1994-10-14"),
            imageUrl: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
            rating: 8.9,
            description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
        }
    ];

    try {
        await Movie.insertMany(movies);
        console.log("Movies seeded successfully");
    } catch (error) {
        console.error("Error seeding movies:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedMovies();
