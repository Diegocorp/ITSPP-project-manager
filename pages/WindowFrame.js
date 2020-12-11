const { BrowserWindow } = require('electron').remote;

$(function() {
  $(document).on('click', '#minimize-btn', function() {
    BrowserWindow.getFocusedWindow().minimize();
  })
});

$(function() {
  $(document).on('click', '#close-btn', function() {
    BrowserWindow.getFocusedWindow().close();
  })
});

$(function() {
  $(document).on('click', '#restore-btn', function() {
    //BrowserWindow.getFocusedWindow().setSize(1200,900)
    if(!BrowserWindow.getFocusedWindow().isMaximized()){
      BrowserWindow.getFocusedWindow().maximize();
    } else{
      BrowserWindow.getFocusedWindow().unmaximize();
    }
  });
});