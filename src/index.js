import express from "express";
import handlebars from "express-handlebars";

// Init express instance
const app = express();

// Add and coning view engine
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main', 
    layoutsDir: 'src/views/layouts',
    partialsDir: 'src/views/partials',
}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.get("/", (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});