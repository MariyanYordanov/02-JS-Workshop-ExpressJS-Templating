import express from "express";
import connectDB from "./config/db.js";
import hbsConfig from "./config/hbs.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import routes from "./routes.js";

// Init express instance
const app = express();

// Middleware to serve static files
app.use(express.static('src/public'));

// Add cookie parser
app.use(cookieParser());

// Add bodyparser
app.use(express.urlencoded({ extended: true }));

// Add authentication middleware
app.use(auth);

// Add and coning view engine
hbsConfig(app);

// Mongoose connection
connectDB();

// Use routes
app.use(routes);

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});