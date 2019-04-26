 
const express = require('express');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());

//middleware

// routes/endpoints
router.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not retrieve projects...'})
        })
});

module.exports = router;