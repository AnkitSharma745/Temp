import { app, shell, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import { join } from 'path';
import log from 'electron-log';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
app.commandLine.appendSwitch('ignore-certificate-errors');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    kiosk: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  // Other app init logic...
  electronApp.setAppUserModelId('Generic-UI');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();
  // Auto updater setup
  autoUpdater.logger = log;
  log.transports.file.level = 'info';

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  // Optional but recommended for consistency
  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'AnkitSharma745',
    repo: 'Temp'
  });

  log.info('Checking for updates...');
  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded, installing...');
    autoUpdater.quitAndInstall(false, true);
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
