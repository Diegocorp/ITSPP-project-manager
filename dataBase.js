const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gpiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log('Error to conect to DB ',err));