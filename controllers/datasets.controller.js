const { createDataset, getDatasets, getDataset, deleteDataset } = require('../queries/datasets.queries');
const { getPlant } = require('../queries/plants.queries');

exports.datasetCreate = async (req, res, next) => {
    try {
        const body = req.body;
        const plantId = body.plant;
        await createDataset(body);
        console.log(body);
        res.redirect('/plants/edit/' + plantId);
    } catch (error) {
        const errors = Object.keys(error.errors).map(key => error.errors[key].message);
        const plant = await getPlant(plantId);
        res.status(400).render('plants/plant-form',
            {
                errors,
                plant,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            });
    }
};

exports.datasetsList = async (req, res, next) => {
    try {
        const datasets = await getDatasets();
        res.render('datasets/datasets',
            {
                datasets,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            });
    } catch (error) {
        next(error);
    }
};

exports.datasetDelete = async (req, res, next) => {
    try {
        const datasetId = req.params.datasetId;
        //const originalDataset = await getDataset(datasetId);
        await deleteDataset(datasetId);
        //await fs.unlink(path.join(__dirname, '../public', originalPlant.image));
        const datasets = await getDatasets();
        res.render('datasets/datasets-list', { datasets });
    } catch (error) {
        next(error);
    }
};