import { v4 as uuid } from 'uuid';

const movies = [
    {
        id: 'dc1e4f72-b38e-4645-a62f-b7554fdf013e',
        title: "Home Alone",
        director: "Chris Columbus",
        releaseYear: 1990,
        genre: "Comedy",
        description: "It is Christmas time and the McCallister family is preparing for a vacation in Paris, France.But the youngest in the family, Kevin(Macaulay Culkin), got into a scuffle with his older brother Buzz(Devin Ratray) and was sent to his room, which is on the third floor of his house.Then, the next morning, while the rest of the family was in a rush to make it to the airport on time, they completely forgot about Kevin, who now has the house all to himself.Being home alone was fun for Kevin, having a pizza all to himself, jumping on his parents' bed, and making a mess. Then, Kevin discovers about two burglars, Harry(Joe Pesci) and Marv(Daniel Stern), about to rob his house on Christmas Eve.Kevin acts quickly by wiring his own house with makeshift booby traps to stop the burglars and to bring them to justice.",
        rating: 8.8,
        imageUrl: "/img/home-alone.jpeg",
        category: "movie"
    },
    {
        id: 'c4d2fd45-a6d5-4c9c-a457-2134f0c202b1',
        title: "The Little Mermaid",
        director: "Ron Clements",
        releaseYear: 1989,
        genre: "Animation",
        description: "The Little Mermaid is a 1989 American animated musical fantasy film produced by Walt Disney Feature Animation and released by Walt Disney Pictures. It is the 28th Disney animated feature film and is based on the Danish fairy tale of the same name by Hans Christian Andersen. The film tells the story of Ariel, a young mermaid princess who is fascinated with life on land and dreams of becoming human. After making a deal with the sea witch Ursula, Ariel trades her voice for legs to pursue her love for Prince Eric.",
        rating: 8.0,
        imageUrl: "/img/the-little-mermaid.jpg",
        category: "movie"
    },
    {
        id: 'b9a2ea3f-e595-40ad-8f9c-5c183aeac6ce',
        title: "Jungle Cruise",
        director: "Jaume Collet-Serra",
        releaseYear: 2021,
        genre: "Adventure",
        description: "Jungle Cruise is a 2021 American adventure film directed by Jaume Collet-Serra and produced by Walt Disney Pictures. Based on the Disney theme park attraction of the same name, the film stars Dwayne Johnson as Frank Wolff, a riverboat captain who takes a scientist (Emily Blunt) and her brother (Jack Whitehall) on a dangerous journey through the Amazon jungle to find an ancient tree with healing powers.",
        rating: 7.0,
        imageUrl: "/img/jungle-cruise.jpeg",
        category: "movie"
    }
];

// object method notation
export default {
    getAllMovies(filter = {}) {
        let result = movies.slice();
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
        movieData.id = uuid();
        movieData.rating = Number(movieData.rating);
        movieData.releaseYear = Number(movieData.releaseYear);
        movies.push(movieData);
        return movieData;
    },
    getMovieById(movieId) {
        const movie = movies.find(movie => movie.id === movieId);
        if (!movie) {
            throw new Error(`Movie with id ${movieId} not found`);
        }
        return movie;
    },
} 