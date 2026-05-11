const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  generatePassword: (length, site) => ipcRenderer.invoke("generate-password", length, site),
  viewPasswords: () => ipcRenderer.invoke("view-passwords"),
  searchPassword: (site) => ipcRenderer.invoke("search-password", site),
  deletePassword: (site) => ipcRenderer.invoke("delete-password", site)
});