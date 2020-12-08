const { ipcRenderer } = require("electron");

window.onload = function() {
    updateStatus = false
    sessionStorage.clear();
};