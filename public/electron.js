const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

const isDev = require("electron-is-dev");

const path = require("path");

// database
const { initDB, saveNote, fetchAllNotes, deleteNote } = require("./db");

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 450,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    mainWindow.once('ready-to-show', async () => {
        // init database in user data path of OS
        initDB(app.getPath('userData'));

        const allNotes = await fetchAllNotes();
        mainWindow.webContents.send('update-note-list', allNotes);

        // show main window
        mainWindow.show();


    });

    mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});


// ipc
ipcMain.on('multiple-file-selected-error', (e) => {
    dialog.showErrorBox("Multiple file selected", "You can add only ONE file at a time!")
})

ipcMain.on('save-note', async (event, note) => {

    await saveNote(note);
    // get all note list from db and update UI
    // TODO: optimize query
    const allNotes = await fetchAllNotes();
    event.sender.send('update-note-list', allNotes);

});

ipcMain.on('update-note-list', async (event) => {
    try {
        const allNotes = await fetchAllNotes();
        event.sender.send('update-note-list', allNotes);
    } catch (err) {
        console.log(`['update-note-list'] error : ${err}`);
    }
});


ipcMain.on('delete-note', async (event, noteId) => {
    await deleteNote(noteId);
});

ipcMain.on('open-file-path', (event, filepath) => {
    // TODO: handle path properly
    shell.showItemInFolder(filepath);
});

