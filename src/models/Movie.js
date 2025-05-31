class Movie {
    constructor(id, title, director, releaseYear, genre, description, rating, imageUrl, category) {
        this.id = id;
        this.title = title;
        this.director = director;
        this.releaseYear = releaseYear;
        this.genre = genre;
        this.description = description;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.category = category;
    }
    static fromObject(obj) {
        return new Movie(
            obj.id,
            obj.title,
            obj.director,
            obj.releaseYear,
            obj.genre,
            obj.description,
            obj.rating,
            obj.imageUrl,
            obj.category
        );
    }
    toObject() {
        return {
            id: this.id,
            title: this.title,
            director: this.director,
            releaseYear: this.releaseYear,
            genre: this.genre,
            description: this.description,
            rating: this.rating,
            imageUrl: this.imageUrl,
            category: this.category
        };
    }
    toString() {
        return `Movie: ${this.title} (${this.releaseYear}), directed by ${this.director}, genre: ${this.genre}, rating: ${this.rating}`;
    }
    static validate(movie) {
        if (!movie.title || !movie.director || !movie.releaseYear || !movie.genre || !movie.description || !movie.rating || !movie.imageUrl) {
            throw new Error("All fields are required");
        }
        if (typeof movie.rating !== 'number' || movie.rating < 0 || movie.rating > 10) {
            throw new Error("Rating must be a number between 0 and 10");
        }
        if (typeof movie.releaseYear !== 'number' || movie.releaseYear < 1888) { // First film was made in 1888
            throw new Error("Release year must be a valid year");
        }
    }
}