const { ipcRenderer } = require("electron");

const nickName = sessionStorage.getItem("nickName");

document.querySelector("#nickName").innerHTML = nickName;

window.onload = function() {
    updateStatus = false
    sessionStorage.removeItem('idToSend');
};

function sendIdProyect(id) {
    console.log("POR ACTUALIZAR", id);
    var idToSend = id;
    sessionStorage.setItem("idToSend", idToSend);
    location.href='registerProyect.html';
}

let proyects = [];

//render tables
function renderProyects(proyects){
  const table = $('#table_id').DataTable({    
    data: proyects,
    columns:[
      { data: 'proyectName' },
      { data: 'startDate' },
      { data: 'typeProyect' },
      { data: 'enterpriseProject' },
      { data: 'objectiveProject' },
      { data: 'statusProject' },
      { data: '_id'},
    ],
    "columnDefs": [
      { 
        "width": "10%", 
        "targets": [0,1,2,3,4,5] 
      },
      {
        "targets": [ 6 ],
        "visible": false,
        "searchable": false,
        "width": "1px"
      }
    ],
    "scrollX": true
  });
  $('#table_id tbody').on('click', 'tr', function () {
    var rowData = table.row( this ).data();
    sendIdProyect(rowData._id);
} );
}

ipcRenderer.on("new-task-created", (e, arg) => {
    const newProyect = JSON.parse(arg);
    proyects.push(newProyect);
    renderProyects(proyects);
    alert("Proyecto creado exitosamente");
  });

ipcRenderer.send('get-proyects');

ipcRenderer.on('get-proyects', (e,arg) =>{
    const proyectsReceived = JSON.parse(arg);
    proyects = proyectsReceived;
    renderProyects(proyects);
});

//Guest rights
const createBtn = $('#createBtn');
const profileBtn = $('#profileBtn');

if(localStorage.getItem('guest') !== null){
  document.querySelector("#nickName").innerHTML = "Invitado";
  profileBtn.hide();
  createBtn.hide();
  $('.dropdown-menu > .dropdown-item:not(:last)').each(function(){
    $(this).hide();
  });

  $('.dropdown-divider').hide();
}else{
  profileBtn.show();
  createBtn.show();
}

$(function() {
  $(document).on('click', '#logoutBtn', function() {
    localStorage.removeItem('guest');
    console.log(localStorage.getItem('guest'));
  })
});