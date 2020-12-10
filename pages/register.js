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


registerBtn.addEventListener("click", async e => {
    e.preventDefault();
    
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

});