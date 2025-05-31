import express from "express";
import handlebars from "express-handlebars";

// Init express instance
const app = express();

// Middleware to serve static files
app.use(express.static('src/public'));

// Add and coning view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/about", (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});