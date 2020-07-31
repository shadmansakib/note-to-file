const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

const isDev = require("electron-is-dev");

const path = require("path");

const {
    MULTIPLE_FILE_SELECTED_ERROR,
    SAVE_NOTE,
    UPDATE_NOTE_LIST,
    DELETE_NOTE,
    OPEN_FILE_PATH,
} = require("./consts");


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

    mainWindow.once('ready-to-show', () => {
        // init database in user data path of OS
        initDB(app.getPath('userData'));

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
ipcMain.on(MULTIPLE_FILE_SELECTED_ERROR, (e) => {
    dialog.showErrorBox("Multiple file selected", "You can add only ONE file at a time!")
})

ipcMain.on(SAVE_NOTE, async (event, note) => {

    await saveNote(note);
    // get all note list from db and update UI
    // TODO: optimize query
    const allNotes = await fetchAllNotes();
    event.sender.send(UPDATE_NOTE_LIST, allNotes);

});

ipcMain.on(UPDATE_NOTE_LIST, async (event) => {
    try {
        const allNotes = await fetchAllNotes();
        event.sender.send(UPDATE_NOTE_LIST, allNotes);
    } catch (err) {
        console.log(`[UPDATE_NOTE_LIST] error : ${err}`);
    }
});


ipcMain.on(DELETE_NOTE, async (event, noteId) => {
    await deleteNote(noteId);
});

ipcMain.on(OPEN_FILE_PATH, (event, filepath) => {
    // TODO: handle path properly
    shell.showItemInFolder(filepath);
});

