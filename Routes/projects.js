 
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

router.get("/:id", (req, res) => {
    const id = req.params.id;
  
    projectsDb
      .get(id)
      .then(project => {
        if (project) {
          res.status(200).json({ project });
        } else {
          res
            .status(404)
            .json({ error: "Specified project ID could not be found" });
        }
      })
      .catch(err => {
        res.status(404).json({ error: "Error performing that project" });
      });
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
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    if (id) {
      projectsDb
        .remove(id)
        .then(result => {
          if (result !== 0) {
            res.status(200).json({ result });
          } else {
            res.status(404).json({ error: "project ID does not exist" });
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "Deleting project could not be performed, try again" });
        });
    } else {
      res.status(404).json({ error: "Provide project ID for removal" });
    }
  });


module.exports = router;