const { model , Schema} = require('mongoose')

const newProyectSchema = new Schema({
  proyectName: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  conclusionDate: {
    type: String,
    required: true
  },
  typeProyect: {
    type: String,
    required: true
  },
  objectiveProject: {
    type: String,
    required: true
  },
  statusProject: {
    type: String,
    required: true
  },
  projectComment: {
    type: String,
    required: true
  },
  enterpriseProject: {
    type: String,
    required: true
  },
  enterpriseContact: {
    type: String,
    required: true
  },
  firstNameContact: {
    type: String,
    required: true
  },
  lastNameContact: {
    type: String,
    required: true
  },
  studentMember: {
    type: Object,
    required: true
  },
  teacherMember: {
    type: Object,
    required: true
  }
})

module.exports = model('Proyect', newProyectSchema);