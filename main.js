// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const appConfig = require('electron-settings');
const path = require('path');
const User = require("./models/User");
const Proyect = require("./models/Proyect");

function createWindow () {
  //Get the previous window size state
  const mainWindowStateKeeper = windowStateKeeper('main');
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    //titleBarStyle: 'hidden',
    frame: false,
    webPreferences: {
      nodeIntegration: true, 
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    }
  })
  //Track window size state
  mainWindowStateKeeper.track(mainWindow);

  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadFile('pages/login.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

//Persist the window size
function windowStateKeeper(windowName) {
  let window, windowState;
  function setBounds() {
    // Restore from appConfig
    if (appConfig.has(`windowState.${windowName}`)) {
      windowState = appConfig.get(`windowState.${windowName}`);
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 800,
    };
  }
  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    appConfig.set(`windowState.${windowName}`, windowState);
  }
  function track(win) {
    window = win;
    ['resize', 'move', 'close'].forEach(event => {
      win.on(event, saveState);
    });
  }
  setBounds();
  
  return({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  });
}

// Mongo DB
// Task

ipcMain.on("new-user", async (e, arg) => {
  console.log(arg);
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

ipcMain.on("get-users", async (e, arg) => {
  const users = await User.find();
  e.reply("get-users", JSON.stringify(users));
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
      studentMember: args.studentMember,
      teacherMember: args.teacherMember
    },
    { new: true }
  );
  e.reply("update-proyect-success", JSON.stringify(updatedProyect));
});

ipcMain.on("update-user", async (e, args) => {
  console.log(args);
  const updatedUser = await User.findByIdAndUpdate(
    args.idSesionToUpdate,
    { 
      userName: args.userName, 
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: args.password,
      academy: args.academy,
      employeeNumber: args.employeeNumber,
    },
    { new: true }
  );
  e.reply("update-user-success", JSON.stringify(updatedUser));
});

module.exports = { createWindow };