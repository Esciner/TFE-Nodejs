const mongoose = require('mongoose');
const uri = 'mongodb+srv://PlantAdmin2:mpAdXxaAQfUIM2VA@plant-analyser.jingw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

exports.clientPromise = mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .catch(err => console.log(err));