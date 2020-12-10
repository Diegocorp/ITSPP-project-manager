const { model , Schema} = require('mongoose')

const newUserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  academy: {
    type: String,
    required: true
  },
  employeeNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = model('User', newUserSchema);