const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/cityrec'

const connect = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true });
}

module.exports = connect;
