const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height: 50,
    },
    webPreferences: {
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`
    }
  })

  win.loadFile('src/collection.html')
}

app.whenReady().then(() => {
  createWindow()
})