// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path');
const User = require("./models/User");
const Proyect = require("./models/Proyect");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, 
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('pages/stadistics.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
/* app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}) */

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// Mongo DB
// Task

ipcMain.on("new-user", async (e, arg) => {
  const newUser = new User(arg);
  const userSaved = await newUser.save();
  e.reply("new-user-created", JSON.stringify(userSaved));
});

ipcMain.on("new-proyect", async (e, arg) => {
  const newProyect = new Proyect(arg);
  const proyectSaved = await newProyect.save();
  e.reply("new-proyect-created", JSON.stringify(proyectSaved));
});

ipcMain.on("get-proyects", async (e, arg) => {
  const proyects = await Proyect.find();
  e.reply("get-proyects", JSON.stringify(proyects));
});

ipcMain.on("delete-proyect", async (e, args) => {
  const proyectDeleted = await Proyect.findByIdAndDelete(args);
  e.reply("delete-proyect-success", JSON.stringify(proyectDeleted));
});

ipcMain.on("update-proyect", async (e, args) => {
  console.log(args);
  const updatedProyect = await Proyect.findByIdAndUpdate(
    args.idProyectToUpdate,
    { 
      proyectName: args.proyectName, 
      releaseDate: args.releaseDate,
      startDate: args.startDate,
      conclusionDate: args.conclusionDate,
      typeProyect: args.typeProyect,
      objectiveProject: args.objectiveProject,
      statusProject: args.statusProject,
      projectComment: args.projectComment,
      enterpriseProject: args.enterpriseProject,
      enterpriseContact: args.enterpriseContact,
      firstNameContact: args.firstNameContact,
      lastNameContact: args.lastNameContact,
    },
    { new: true }
  );
  e.reply("update-proyect-success", JSON.stringify(updatedProyect));
});

module.exports = { createWindow };
