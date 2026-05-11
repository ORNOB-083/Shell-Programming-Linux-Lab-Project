const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec } = require("child_process");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();
});

const scriptPath = path.join(__dirname, "../shell-scripting/manager.sh");

// Generate Password
ipcMain.handle("generate-password", async (event, length, site) => {
  return new Promise((resolve, reject) => {
    exec(`bash "${scriptPath}" generate ${length} ${site}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});

// View Passwords
ipcMain.handle("view-passwords", async () => {
  return new Promise((resolve, reject) => {
    exec(`bash "${scriptPath}" view`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});

// Search Password
ipcMain.handle("search-password", async (event, site) => {
  return new Promise((resolve, reject) => {
    exec(`bash "${scriptPath}" search ${site}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});

// Delete Password
ipcMain.handle("delete-password", async (event, site) => {
  return new Promise((resolve, reject) => {
    exec(`bash "${scriptPath}" delete ${site}`, (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});