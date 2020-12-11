const { ipcRenderer } = require("electron");

window.onload = function() {
    updateStatus = false
    sessionStorage.clear();
};

const registerBtn = document.querySelector("#registerBtn");
const userName = document.querySelector("#userName");
const email = document.querySelector("#email");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const academy = document.querySelector("#academy");
const password = document.querySelector("#password");
const employeeNumber = document.querySelector("#employeeNumber");
const securityCode = document.querySelector("#securityCode");

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
      registerUser()
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();


function registerUser(){
    
    console.log(securityCode.value);

    if (securityCode.value == 7789) {
        const user = {
            userName: userName.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value,
            academy: academy.value,
            employeeNumber: employeeNumber.value,
            password: password.value
        };
      
        ipcRenderer.send("new-user", user);
        alert("Usuario creado exitosamente");
        location.href='login.html';       
    } else {
        alert("Codigo de seguridad incorrecto");
    }

}