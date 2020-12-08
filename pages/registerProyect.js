const { ipcRenderer } = require("electron");

const proyectBtn = document.querySelector("#proyectBtn");
const deleteBtn = document.querySelector("#deleteBtn");


//sessionStorage
var idToSend = sessionStorage.getItem("idToSend");
console.log(idToSend);

let updateStatus = false;
let idProyectToUpdate = '';

window.onload = function() {
  if (idToSend) {
    editProyect();
  }
};

let proyectsList = [];


const proyectName = document.querySelector("#proyectName");
const releaseDate = document.querySelector("#releaseDate");
const startDate = document.querySelector("#startDate");
const conclusionDate = document.querySelector("#conclusionDate");
const typeProyect = document.querySelector("#typeProyect");
const objectiveProject = document.querySelector("#objectiveProject");
const statusProject = document.querySelector("#statusProject");
const projectComment = document.querySelector("#projectComment");
const enterpriseProject = document.querySelector("#enterpriseProject");
const enterpriseContact = document.querySelector("#enterpriseContact");
const firstNameContact = document.querySelector("#firstNameContact");
const lastNameContact = document.querySelector("#lastNameContact");

proyectBtn.addEventListener("click", async e => {
    e.preventDefault();

    const studentEntries = $('.entry-student').map(function(){
      return [[this.querySelector('.studentName').value, this.querySelector('.studentId').value]]
    }).get();
    const studentObjectEntries = Object.assign({}, studentEntries);

    //Teacher Object Generator
    const teacherEntries = $('.entry-teacher').map(function(){
      return [[this.querySelector('.teacherName').value, this.querySelector('.teacherId').value, this.querySelector('.teacherSubject').value]]
    }).get();
    const teacherObjectEntries = Object.assign({}, teacherEntries);

    const proyect = {
        proyectName: proyectName.value,
        releaseDate: releaseDate.value,
        startDate: startDate.value,
        conclusionDate: conclusionDate.value,
        typeProyect: typeProyect.value,
        objectiveProject: objectiveProject.value,
        statusProject: statusProject.value,
        projectComment: projectComment.value,
        enterpriseProject: enterpriseProject.value,
        enterpriseContact: enterpriseContact.value,
        firstNameContact: firstNameContact.value,
        lastNameContact: lastNameContact.value,
        studentMember: studentObjectEntries,
        teacherMember: teacherObjectEntries
      };
      if (!updateStatus) {
        ipcRenderer.send("new-proyect", proyect);
        alert("Proyecto Creado Exitosamente");
        updateStatus = false
        sessionStorage.clear();
        location.href='proyects.html';
      } else {
        ipcRenderer.send("update-proyect", { ...proyect, idProyectToUpdate });
      }
  });

  //Functions to add a field
$(function() {
  $(document).on('click', '.btn-add-student', function(e) {
    e.preventDefault();  
    let dynaForm = $('.dynamic-wrap-student form:first');
    let currentEntry = $(this).parents('.entry-student:first');
    let newEntry = $(currentEntry.clone()).appendTo(dynaForm);  
    newEntry.find('input').val('');
    dynaForm.find('.entry-student:not(:last) .btn-add-student')
      .removeClass('btn-add-student').addClass('btn-remove')
      .removeClass('btn-success').addClass('btn-danger')
      .html('<i class="fas fa-minus"></i>');
  }).on('click', '.btn-remove', function(e) {
    $(this).parents('.entry-student:first').remove();  
    e.preventDefault();
    return false;
  });
});

$(function() {
  $(document).on('click', '.btn-add-teacher', function(e) {
    e.preventDefault();  
    let dynaForm = $('.dynamic-wrap-teacher form:first');
    let currentEntry = $(this).parents('.entry-teacher:first');
    let newEntry = $(currentEntry.clone()).appendTo(dynaForm);  
    newEntry.find('input').val('');
    dynaForm.find('.entry-teacher:not(:last) .btn-add-teacher')
      .removeClass('btn-add-teacher').addClass('btn-remove')
      .removeClass('btn-success').addClass('btn-danger')
      .html('<i class="fas fa-minus"></i>');
  }).on('click', '.btn-remove', function(e) {
    $(this).parents('.entry-teacher:first').remove();  
    e.preventDefault();
    return false;
  });
});

/* function projectMembers() {
    //Student Object Generator
    const studentEntries = $('.entry-student').map(function(){
      return [[this.querySelector('.studentName').value, this.querySelector('.studentId').value]]
    }).get();
    const studentObjectEntries = Object.assign({}, studentEntries);

    //Teacher Object Generator
    const teacherEntries = $('.entry-teacher').map(function(){
      return [[this.querySelector('.teacherName').value, this.querySelector('.teacherId').value, this.querySelector('.teacherSubject').value]]
    }).get();
    const teacherObjectEntries = Object.assign({}, teacherEntries);

    console.log(studentObjectEntries);
    console.log(teacherObjectEntries);
} */

  
function deleteProyect(){
    const result = confirm('Seguro que desea eliminar el Proyecto actual del sistema?');
    if (result) {
        ipcRenderer.send('delete-proyect', idToSend);
        location.href='proyects.html';
        sessionStorage.clear();
    }
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function editProyect(){
    updateStatus = true;
    idProyectToUpdate = idToSend;
    await sleep(100);
    const proyect = proyects.find(proyect => proyect._id === idProyectToUpdate);
    proyectName.value = proyect.proyectName;
    releaseDate.value = proyect.releaseDate;
    startDate.value = proyect.startDate;
    conclusionDate.value = proyect.conclusionDate;
    typeProyect.value = proyect.typeProyect;
    objectiveProject.value = proyect.objectiveProject;
    statusProject.value = proyect.statusProject;
    projectComment.value = proyect.projectComment;
    enterpriseProject.value = proyect.enterpriseProject;
    enterpriseContact.value = proyect.enterpriseContact;
    firstNameContact.value = proyect.firstNameContact;
    lastNameContact.value = proyect.lastNameContact;




    
}


ipcRenderer.on('delete-proyect-success', (e,arg) => {
    const deletedProyect = JSON.parse(arg);
    
})


ipcRenderer.send('get-proyects');

ipcRenderer.on('get-proyects', (e,arg) =>{
    const proyectsReceived = JSON.parse(arg);
    proyects = proyectsReceived;
    proyectsList = proyectsReceived;
});

ipcRenderer.on("update-proyect-success", (e, args) => {
    updateStatus = false;
    const updatedProyect = JSON.parse(args);
    proyects = proyectsList.map((t, i) => {
      if (t._id === updatedProyect._id) {
        t.proyectName = updatedProyect.proyectName;
        t.releaseDate = updatedProyect.releaseDate;
        t.startDate = updatedProyect.startDate;
        t.conclusionDate = updatedProyect.conclusionDate;
        t.typeProyect = updatedProyect.typeProyect;
        t.objectiveProject = updatedProyect.objectiveProject;
        t.statusProject = updatedProyect.statusProject;
        t.projectComment = updatedProyect.projectComment;
        t.enterpriseProject = updatedProyect.enterpriseProject;
        t.enterpriseContact = updatedProyect.enterpriseContact;
        t.firstNameContact = updatedProyect.firstNameContact;
        t.lastNameContact = updatedProyect.lastNameContact;
      }

      location.href='proyects.html';
      updateStatus = false
      sessionStorage.clear();

      return t;
    });
    alert("Proyecto Editado Exitosamente");
  });