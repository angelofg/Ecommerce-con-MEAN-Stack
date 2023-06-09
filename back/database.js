const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tienda',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB conectada'))
    .catch(err => console.error(err));