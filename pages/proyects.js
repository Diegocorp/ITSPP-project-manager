const { ipcRenderer } = require("electron");

const dataTable = document.querySelector('#dataTable');

window.onload = function() {
    updateStatus = false
    sessionStorage.clear();
};

function sendIdProyect(id) {
    console.log("POR ACTUALIZAR", id);

    var idToSend = id;
    sessionStorage.setItem("idToSend", idToSend);

    location.href='registerProyect.html';
}


$(document).ready(function(){
    $("#searchInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#dataTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

let proyects = [];

function renderProyects(proyects){
    dataTable.innerHTML = '';
    let table = `
        <table class="table dataTable my-0 table-hover" id="dataTable">
        <thead>
            <tr>
                <th>Proyecto</th>
                <th>Fecha de inicio</th>
                <th>Tipo de proyecto</th>
                <th>Empresa</th>
                <th>Objetivo</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
    
    `;
    proyects.map(t => {
        table = table +
        `<tr onclick="sendIdProyect('${t._id}')">
          <td>${t.proyectName}</td>
          <td>${t.startDate}</td>
          <td>${t.typeProyect}</td>
          <td>${t.enterpriseProject}</td>
          <td>${t.objectiveProject}</td>
          <td>${t.statusProject}</td>
         </tr>`
    })
        table = table +
    `</tbody>
    </table>`
    ;

    dataTable.innerHTML = table;
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