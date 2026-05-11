const output = document.getElementById("output");

// Generate Password
document.getElementById("generateBtn").addEventListener("click", async () => {
  const length = document.getElementById("length").value;
  const site = document.getElementById("site").value;

  try {
    const result = await window.electronAPI.generatePassword(length, site);
    output.textContent = result;
  } catch (error) {
    output.textContent = "Error: " + error;
  }
});

// View Passwords
document.getElementById("viewBtn").addEventListener("click", async () => {
  try {
    const result = await window.electronAPI.viewPasswords();
    output.textContent = result;
  } catch (error) {
    output.textContent = "Error: " + error;
  }
});

// Search Password
document.getElementById("searchBtn").addEventListener("click", async () => {
  const site = document.getElementById("searchSite").value;

  try {
    const result = await window.electronAPI.searchPassword(site);
    output.textContent = result;
  } catch (error) {
    output.textContent = "Error: " + error;
  }
});

// Delete Password
document.getElementById("deleteBtn").addEventListener("click", async () => {
  const site = document.getElementById("deleteSite").value;

  try {
    const result = await window.electronAPI.deletePassword(site);
    output.textContent = result;
  } catch (error) {
    output.textContent = "Error: " + error;
  }
});