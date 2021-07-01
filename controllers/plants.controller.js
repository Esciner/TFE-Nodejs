const { getPlants, getPlantByName, createPlant, deletePlant, getPlant, updatePlant } = require('../queries/plants.queries');

//Pour des chemin corrects
const path = require('path');
// Pour la creation de nouveau child process
const { spawn } = require('child_process');

//Pour la gestion de l'upload de fichiers
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/plants'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
})

//Gestion de fichier asynchrone
const fs = require('fs').promises

exports.plantsList = async (req, res, next) => {
    try {
        const plants = await getPlants();
        res.render('plants/plants',
            {
                plants,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            });
    } catch (error) {
        next(error);
    }
};

exports.plantNew = (req, res, next) => {
    res.render('plants/plant-form',
        {
            plants: {},
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });
};

exports.plantCreate = [
    upload.single('plant-image'),
    async (req, res, next) => {
        try {
            const body = req.body;
            body.image = `/images/plants/${req.file.filename}`;
            await createPlant(body);
            res.redirect('/plants');
        } catch (error) {
            const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            res.status(400).render('plants/plant-form',
                {
                    errors,
                    isAuthenticated: req.isAuthenticated(),
                    currentUser: req.user
                });
        }
    }
];

exports.plantDelete = async (req, res, next) => {
    try {
        const plantId = req.params.plantId;
        const originalPlant = await getPlant(plantId);
        await deletePlant(plantId);
        await fs.unlink(path.join(__dirname, '../public', originalPlant.image));
        const plants = await getPlants();
        res.render('plants/plants-list', { plants });
    } catch (error) {
        next(error);
    }
};

exports.plantEdit = async (req, res, next) => {
    try {
        const plantId = req.params.plantId;
        const plant = await getPlant(plantId);
        res.render('plants/plant-form',
            {
                plant,
                isAuthenticated: req.isAuthenticated(),
                currentUser: req.user
            });
    } catch (error) {
        next(error);
    }
};

exports.plantUpdate = [
    upload.single('plant-image'),
    async (req, res, next) => {
        const plantId = req.params.plantId;
        try {
            const body = req.body;
            body.image = `/images/plants/${req.file.filename}`;
            const originalPlant = await getPlant(plantId);
            await updatePlant(plantId, body);
            await fs.unlink(path.join(__dirname, '../public', originalPlant.image));
            res.redirect('/plants');
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
    }
];

exports.plantAnalyse =
    [
        upload.single('plant-image'),
        async (req, res, next) => {
            let dataSet;
            const image = `../public/images/plants/${req.file.filename}`;
            // spawn new child process to call the python script
            // -s for the subject -i for the images directory -m for the mask directory
            const python = spawn('python',
                [
                    path.join(__dirname, '../python/test2.py'),
                    '-s', path.join(__dirname, image),
                    '-i', path.join(__dirname, '../python/dataset/images'),
                    '-m', path.join(__dirname, '../python/dataset/maskOrigin')
                ]);
            // collect data from script
            python.stdout.on('data', function (data) {
                console.log('Pipe data from python script ...');
                dataSet = data.toString();
            });
            // in close event we are sure that stream is from child process is closed
            python.on('close', async (code) => {
                try {
                    console.log(`child process close all stdio with code ${code}`);
                    // Slice because python add /r/n so we remove for the search
                    //console log for testing if the model work
                    console.log(dataSet.slice(0, -2));
                    const plant = await getPlantByName(dataSet.slice(0, -2));
                    //deleting the image for stockage space reason
                    await fs.unlink(path.join(__dirname, image));
                    res.render('plants/plant-analyse',
                        {
                            plant,
                            isAuthenticated: req.isAuthenticated(),
                            currentUser: req.user
                        })
                } catch (error) {
                    next(error);
                }
            });
        }
    ]

exports.plantAnalyserForm = (req, res, next) => {
    res.render('plants/plant-analyse-form',
        {
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });
};