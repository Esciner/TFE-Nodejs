const mongoose = require('mongoose');
const schema = mongoose.Schema;

const datasetSchema = schema({
  image: {
    type: String,
    required: [true, 'Champ required']
  },
  mask: {
    type: String,
    required: [true, 'Champ required']
  },
  plant: {
    type: mongoose.Types.ObjectId,
    ref: 'plants'
  }
});

const Dataset = mongoose.model('dataset', datasetSchema);

module.exports = Dataset;