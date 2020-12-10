const { ipcRenderer } = require("electron");

window.onload = function() {
    updateStatus = false
    sessionStorage.removeItem('idToSend');
};

const email = document.querySelector("#inputEmail");
const password = document.querySelector("#inputPassword");
let pass = false;

function validationUsers(){
    pass = false;
    ipcRenderer.send('get-users');

    ipcRenderer.on('get-users', (e,arg) =>{
        const usersReceived = JSON.parse(arg);
        users = usersReceived;    
        users.map(t => {
            if (t.email === email.value && t.password === password.value) {
                pass = true;
                sessionStorage.setItem('idSesion', t._id);
                sessionStorage.setItem('nickName', t.userName);
                location.href='stadistics.html';
            }
        })
        if (pass === false) {
            alert("Correo o contraseña incorrecta");
            pass = true;
        }
    });
}
