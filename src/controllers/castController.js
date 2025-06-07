import { Router } from 'express';
import castService from '../services/castService.js';

const castController = Router();

// Cast create routes
castController.get('/create', (req, res) => {
    res.render('cast-create', { pageTitle: 'Create' });
});

castController.post('/create', async (req, res) => {
    try {
        const newCastMember = req.body;
        await castService.createCastMember(newCastMember);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(400).send('Invalid cast data', err.message);
    }
});

export default castController;