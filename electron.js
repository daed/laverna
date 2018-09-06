const electron = require('electron');

// TODO: reference the config file for this.
port = 9000;

const {app, BrowserWindow} = require('electron');
const laverna = require('./server.js')(port);
const {sigApp, sigServer} = require('./laverna-server/server.js');

//laverna.on("listening", function () { laverna.close(); });

function createWindow () {
    let win = new BrowserWindow({
        width: 925, 
        height: 800,
        backgroundColor: '#259D7A',
        minWidth: 925,
    });
    //win.loadFile('dist/index.html');
    win.loadURL("http://localhost:" + port);
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        laverna.close();
        //sigServer.close();
        //sigApp.quit();
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit();
});
