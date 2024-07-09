const express = require('express');
const router = express.Router();
const { Purchase, User } = require('../models');

// Create a new purchase
router.post('/purchases', async (req, res) => {
    const { stockSymbol, shares, pricePerShare, userId } = req.body;
    try {
        const purchase = await Purchase.create({ stockSymbol, shares, pricePerShare, userId });
        res.status(201).json(purchase);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/users/:userId/purchases', async (req, res) => {
    const { userId } = req.params;
    try {
        const purchases = await Purchase.findAll({ where: { userId } });
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
