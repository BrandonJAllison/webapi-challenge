const express = require('express');
const actionsDb = require('../data/helpers/actionModel');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();


//middleware

function checkProjectId (req,res,next) {
    projectsDb.get(req.body.project_id)
        .then(project => {
            next();
        })
        .catch(err => {
            res.status(404).json({message: `project of id: ${req.body.project_id} not found`})
        })
}

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

router.post('/', (req, res) => {
    const { project_id, description, notes} = req.body;

    if(project_id && description.length <= 128 && description.length >= 1 && notes) {
        actionsDb.insert(req.body)
            .then(result => {
                res.status(201).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not add new action. Please ensure your description is less than 128 characters and you have provided and ID of an existing project!' });
            });
    } else {
        res.status(401).json({ message: 'Please provide ProjectID of an existing project, Description and Notes.' });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { project_id, description, notes, completed } = req.body;

    if(project_id && description.length <= 128 && description.length >= 1 && notes) {
        actionsDb.update({description, notes, completed})
            .then(result => {
                res.status(200).json({ result });
            })
            .catch(err => {
                res.status(500).json({ error: 'Action Update operation failed, try again' });
            });
    } else {
        res.status(404).json({error: 'Please provide projectID, description, notes.' });
    }
});

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