const { ipcRenderer } = require("electron");

window.onload = function() {
    updateStatus = false
    sessionStorage.clear();
};

let cancel = 0, develop = 0, finish = 0, implement = 0;
let dds = 0, pt = 0, st = 0;

function countStatusProyects(proyects){

    proyects.map(t => {
        if (t.statusProject === "Cancelado") {
            cancel++;
            document.querySelector("#spanCancel").innerHTML = cancel;
        }
        if (t.statusProject === "En desarrollo") {
            develop++;
            document.querySelector("#spanDevelop").innerHTML = develop;
        }
        if (t.statusProject === "Finalizado") {
            finish++;
            document.querySelector("#spanFinish").innerHTML = finish;
        }
        if (t.statusProject === "Implementado") {
            implement++;
            document.querySelector("#spanImplement").innerHTML = implement;
        }
    })

    proyects.map(t => {
        if (t.typeProyect === "Desarrollo de software") {
            dds++;
        }
        if (t.typeProyect === "Paquete tecnologico") {
            pt++;
        }
        if (t.typeProyect === "Servicio tecnologico") {
            st++;
        }
    })
    console.log("dds",dds);
    console.log("pt",pt);
    console.log("st",st);
    var ctxD = document.getElementById("doughnutChart").getContext('2d');
    var myLineChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
    labels: ["Desarrollo de software", "Paquete tecnologico", "Servicio tecnologico"],
    datasets: [{
    data: [dds, pt, st],
    backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"]
    }]
    },
    options: {
    responsive: true
    }
    });

    //bar
    var ctxB = document.getElementById("barChart").getContext('2d');
    var myBarChart = new Chart(ctxB, {
    type: 'bar',
    data: {
    labels: ["Cancelados", "En desarrollo", "Finalizados", "Implementados"],
    datasets: [{
    label: '',
    data: [cancel, develop, finish, implement],
    backgroundColor: [
    '#f0ad4e',
    '#36b9cc',
    '#1cc88a',
    '#4e73df'
    ],
    borderWidth: 1
    }]
    },
    options: {
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero: true
    }
    }]
    }
    }
    });

}



ipcRenderer.send('get-proyects');

ipcRenderer.on('get-proyects', (e,arg) =>{
    const proyectsReceived = JSON.parse(arg);
    proyects = proyectsReceived;
    countStatusProyects(proyects);
});