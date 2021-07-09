const Dataset = require('../database/models/dataset.model');

exports.getDatasets = () => {
    return Dataset.find({}).exec();
};

exports.getDataset = (datasetId) => {
    return Dataset.findById(datasetId).exec();
};

exports.getDatasetsByPlant = (plantId) => {
    return Dataset.find({ plant: plantId }).exec();
};

exports.createDataset = (dataset) => {
    const newDataset = new Dataset(dataset);
    return newDataset.save();
};

exports.deleteDataset = (datasetId) => {
    return Dataset.findByIdAndDelete(datasetId).exec();
};