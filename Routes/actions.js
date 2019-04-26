const express = require('express');
const actionsDb = require('../data/helpers/actionModel');
const router = express.Router();

//middleware

// routes/endpoints
router.get('/', (req, res) => {
    actionsDb.get()
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not retrieve actions...'})
        })
});

module.exports = router;