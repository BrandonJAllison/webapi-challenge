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

router.get('/:id', (req,res) => {
    actionsDb.get(req.params.id)
        .then(action => {
            res.status(200).json({action})
        })
        .catch(err => {
            res.status(404).json({message: `can not find action of id: ${req.params.id}`})
        })
})

router.post('/', (req,res) => {
    actionsDb.insert(req.body)
        .then(response => {
            res.status(201).json({response})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered adding action`})
        })
})

router.put('/:id',(req,res) => {
    actionsDb.update(req.params.id,req.body)
        .then(updatedAction => {
            res.status(200).json({updatedAction})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered in updating action`})
        })
})

router.delete('/:id', (req,res) => {
    actionsDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `successfully removed action of id: ${req.params.id}`})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered removing action...`})
        })
})



module.exports = router;