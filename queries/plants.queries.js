const Plant = require('../database/models/plant.model');

exports.getPlants = () => {
  return Plant.find({}).exec();
};

exports.getPlantByName = (plantName) => {
  //RegExp insensitive with the "i"
  //A ameliorer car mongodb est lent en insensitive
  return Plant.findOne({ name: { $regex: new RegExp(plantName, "i") } }).exec();
};

exports.getPlant = (plantId) => {
    return Plant.findById(plantId).exec();
};

exports.createPlant = (plant) => {
  const newPlant = new Plant(plant);
  return newPlant.save();
};

exports.deletePlant = (plantId) => {
    return Plant.findByIdAndDelete(plantId).exec();
};

exports.updatePlant = (plantId, plant) => {
    return Plant.updateOne({ _id:plantId }, { $set: plant }, { runValidators: true });
};