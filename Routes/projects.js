 
const express = require('express');
const projectsDb = require('../data/helpers/projectModel');
const router = express.Router();
router.use(express.json());

//middleware

//endpoints
router.get('/', (req, res) => {
    projectsDb.get()
        .then(projects => {
            res.status(200).json({projects})
        })
        .catch(err => {
            res.status(500).json({message: 'Could not retrieve projects...'})
        })
});

router.get('/:id', (req,res) => {
    projectsDb.get(req.params.id)
        .then(project => {
            res.status(200).json({project})
        })
        .catch(err => {
            res.status(404).json({message: `project of id: ${req.params.id} not found`});
        })
});

router.post('/',(req,res) => {
    projectsDb.insert(req.body)
        .then(result => {
            res.status(201).json({result})
        })
        .catch(err => {
            res.status(500).json({message: 'error encountered creating project...'})
        })
});

router.put('/:id', (req,res) => {
    projectsDb.update(req.params.id,req.body)
        .then(updatedProject => {
            res.status(200).json({updatedProject})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered updating project of id ${req.params.id}`})
        })
})

router.delete('/:id',(req,res) => {
    projectsDb.remove(req.params.id)
        .then(count => {
            res.status(200).json({message: `project of id ${req.params.id} successfully removed`})
        })
        .catch(err => {
            res.status(500).json({message: `error encountered in trying to remove project...`})
        })
})


module.exports = router;