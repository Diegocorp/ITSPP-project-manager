const { ipcRenderer } = require("electron");

window.onload = function() {
    updateStatus = false
    sessionStorage.removeItem('idToSend');
    editProfile();
};

let usersList = [];

const idSesion = sessionStorage.getItem("idSesion");
const nickName = sessionStorage.getItem("nickName");

document.querySelector("#nickName").innerHTML = nickName;

const profileBtn = document.querySelector("#profileBtn");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const academy = document.querySelector("#academy");
const employeeNumber = document.querySelector("#employeeNumber");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(function() {
  'use strict';
  window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
  form.addEventListener('submit', function(event) {
  if (form.checkValidity() === false) {
  event.preventDefault();
  event.stopPropagation();
  } else {
    updateProfile()
  }
  form.classList.add('was-validated');
  }, false);
  });
  }, false);
  })();

async function editProfile(){
    idSesionToUpdate = idSesion;
    await sleep(100);
    const user = users.find(user => user._id === idSesionToUpdate);
    userName.value = user.userName;
    email.value = user.email;
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    password.value = user.password;
    academy.value = user.academy;
    employeeNumber.value = user.employeeNumber;
}

function updateProfile(){
    const user = {
        userName: userName.value,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value,
        academy: academy.value,
        employeeNumber: employeeNumber.value
      };
        ipcRenderer.send("update-user", { ...user, idSesionToUpdate });
}

ipcRenderer.on("update-user-success", (e, args) => {
    const updatedUser = JSON.parse(args);
    users = usersList.map((t, i) => {
      if (t._id === updatedUser._id) {
        t.userName = updatedUser.userName;
        t.email = updatedUser.email;
        t.firstName = updatedUser.firstName;
        t.lastName = updatedUser.lastName;
        t.password = updatedUser.password;
        t.academy = updatedUser.academy;
        t.employeeNumber = updatedUser.employeeNumber;
      }
      location.href='profile.html';
      return t;
    });
    alert("Perfil Editado Exitosamente");
  });

ipcRenderer.send('get-users');

ipcRenderer.on('get-users', (e,arg) =>{
    const usersReceived = JSON.parse(arg);
    users = usersReceived;    
    userList = usersReceived;
});