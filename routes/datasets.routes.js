const router = require('express').Router();
const { datasetCreate, datasetsList, datasetDelete } = require('../controllers/datasets.controller');

//GET
router.get('/', datasetsList);

//POST
// TODO: à mettre en update plus tard
router.post('/', datasetCreate);

//DELETE
router.delete('/:datasetId', datasetDelete)

module.exports = router;