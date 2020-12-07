const mongoose = require('mongoose');

/* mongoose.connect('mongodb://localhost/gpiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log('Error to conect to DB ',err)); */

mongoose.connect('mongodb+srv://admin:LRXIMWL8IN7Fm1HU@clustergpi.p0zcz.mongodb.net/gpiDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log('Error to conect to DB ',err));