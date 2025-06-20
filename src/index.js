import express from "express";
import connectDB from "./config/db.js";
import hbsConfig from "./config/hbs.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";
import routes from "./routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Init express instance
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Add cookie parser
app.use(cookieParser());

// Add bodyparser
app.use(express.urlencoded({ extended: true }));

// Add authentication middleware
app.use(auth);

// Add and config view engine
hbsConfig(app);

// Mongoose connection
connectDB();

// Use routes
app.use(routes);

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});