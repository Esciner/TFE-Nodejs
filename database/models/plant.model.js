const mongoose = require('mongoose');
const schema = mongoose.Schema;

const plantSchema = schema({
  content: {
    type: String,
    maxlength: [140, 'Content to long'],
    minlength: [1, 'Content to short'],
    required: [true, 'Champ required']
  },
  name: {
    type: String,
    maxlength: [140, 'Name to long'],
    minlength: [1, 'Name to short'],
    required: [true, 'Champ required']
  },
  image: {
    type: String,
    default: '/images/340.jpg'
  }
});

const Plant = mongoose.model('plant', plantSchema);

module.exports = Plant;