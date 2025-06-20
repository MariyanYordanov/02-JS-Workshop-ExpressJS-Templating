import { Router } from 'express';
import castService from '../services/castService.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const castController = Router();

// Cast create routes
castController.get('/create', isAuthenticated, (req, res) => {
    res.render('cast-create', { pageTitle: 'Create' });
});

castController.post('/create', isAuthenticated, async (req, res) => {
    
    const newCastMember = req.body;
    if (!newCastMember) {
        return res.redirect('/', { message: 'Invalid cast data' });
    }

    try {
        await castService.createCastMember(newCastMember);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid cast data', err.message);
    }
});

export default castController;