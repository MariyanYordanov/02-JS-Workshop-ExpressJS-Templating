import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";

// Init express instance
const app = express();

// Middleware to serve static files
app.use(express.static('src/public'));

// Add bodyparser
app.use(express.urlencoded({ extended: true }));

// Add and coning view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

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