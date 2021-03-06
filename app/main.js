const electron = require('electron');
// Module to control application life.

const AutoLaunch = require('auto-launch');

const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

var trayImage;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: { nodeIntegration: false }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.setAutoHideMenuBar(true);

    // and load the index.html of the app.
    //mainWindow.loadURL(`file://${__dirname}/app/index.html`) // Use this if your source is offline
    mainWindow.loadURL('https://mail.google.com') // Use this if your source is HOSTED

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Do not close on quit
    mainWindow.on('close', function(event) {
        event.preventDefault();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    } else {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

var webmailAutoLauncher = new AutoLaunch({
    name: 'Webmail'
});

webmailAutoLauncher.enable();

webmailAutoLauncher.isEnabled()
    .then(function(isEnabled) {
        if (isEnabled) {
            return;
        }
        webmailAutoLauncher.enable();
    })
    .catch(function(err) {
        // handle error 
    });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// ELECTRON PACKAGER MEMO
// to build the app use this Cmd
// install electron packager: npm install electron-packager --save-dev
// electron-packager <sourcedir> <appname> --platform=<platform> --arch=<arch> [optional flags...]