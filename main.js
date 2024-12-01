const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    icon: path.join(__dirname, 'icon.jpg'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  // Обработчики событий окна
  ipcMain.handle('minimize-window', () => {
    win.minimize()
  })

  ipcMain.handle('maximize-window', () => {
    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.handle('close-window', () => {
    win.close()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Добавить обработку ошибок
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  app.quit()
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error)
  app.quit()
}) 