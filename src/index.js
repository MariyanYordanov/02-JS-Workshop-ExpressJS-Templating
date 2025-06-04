import express from "express";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import connectDB from "./config/db.js";
import hbsConfig from "./config/hbs.js";

// Init express instance
const app = express();

// Middleware to serve static files
app.use(express.static('src/public'));

// Add bodyparser
app.use(express.urlencoded({ extended: true }));

// Add and coning view engine
hbsConfig(app);

// mongoose connection
connectDB();

// Use routes
app.use(homeController);
app.use('/movies', movieController);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 Not Found handler
app.all('*url', (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});