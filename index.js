const electron = require('electron');
const path = require('path');
const url = require('url');
const { app, BrowserWindow } = electron;

// Listen for app to be ready
app.on('ready', function () {
  // Create new window
  mainWindow = new BrowserWindow({
    width: 1920, height: 1080, webPreferences: {
      nodeIntegration: true
    }
  });
  // Load html in window
  // mainWindow.setMenu(null);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/ui/html/main.html'),
    protocol: 'file:',
    slashes: true
  }));
  // Quit app when closed
  mainWindow.on('closed', function () {
    app.quit();
  });

});
