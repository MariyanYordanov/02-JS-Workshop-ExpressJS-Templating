import Cast from "./src/models/Cast.js";
import connectDB from "./src/config/db.js";
import mongoose from "mongoose";

async function seedCast() {
    await connectDB();

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
            imageUrl: "https://examplejpg.com/mark-ruffalo.jpg"
        },
        {
            name: "Test",
            age: 42,
            born: new Date("1981-06-13"),
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoIKQIGtYhC0ufGFsJQl6TcR1VMdhjq1A9g&usqp=CAU"
        },
        {
            name: "Benedict Cumberbatch",
            age: 47,
            born: new Date("1976-07-19"),
            imageUrl: "https://example.com/benedict-cumberbatch.jpg"
        },
        {
            name: "Tom Holland",
            age: 27,
            born: new Date("1996-06-01"),
            imageUrl: "https://example.com/tom-holland.jpg"
        },
        {
            name: "Samuel L. Jackson",
            age: 74,
            born: new Date("1948-12-21"),
            imageUrl: "https://example.com/samuel-l-jackson.jpg"
        },
        {
            name: "Brie Larson",
            age: 34,
            born: new Date("1989-10-01"),
            imageUrl: "https://example.com/brie-larson.jpg"
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