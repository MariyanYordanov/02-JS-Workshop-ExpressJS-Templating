import { Router } from 'express';

import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import castController from "./controllers/castController.js";
import authController from "./controllers/authController.js";

const routes = Router();

routes.use(homeController);
routes.use('/movies', movieController);
routes.use('/casts', castController);
routes.use('/auth', authController);

// 404 Not Found handler
routes.all('*url', (req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

export default routes;