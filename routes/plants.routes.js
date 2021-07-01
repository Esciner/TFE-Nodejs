const router = require('express').Router();
const { plantsList, plantNew, plantCreate, plantDelete, plantEdit, plantUpdate, plantAnalyse, plantAnalyserForm } = require('../controllers/plants.controller');

//GET
router.get('/edit/:plantId', plantEdit);
router.get('/analyser-form', plantAnalyserForm);
router.get('/new', plantNew);
router.get('/', plantsList);

//POST
// TODO: à mettre en update plus tard
router.post('/update/:plantId', plantUpdate)
router.post('/analyzer', plantAnalyse);
router.post('/', plantCreate);

//DELETE
router.delete('/:plantId', plantDelete)
module.exports = router;