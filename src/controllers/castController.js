import express from 'express';
import castService from '../services/castService.js';

const castController = express.Router();

// Cast create routes
castController.get('/create', (req, res) => {
    res.render('cast-create');
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