const { app, Menu } = require('electron');
const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: 'File',
          submenu: [
            { role: 'hide' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
      ]
    : []),
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ]
        : [{ role: 'close' }]),
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'About',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://ryd3v.com');
        },
      },
    ],
  },
];

if (process.env.DEBUG) {
  template.push({
    label: 'Debugging',
    submenu: [
      {
        label: 'Dev Tools',
        role: 'toggleDevTools',
      },

      { type: 'separator' },
      {
        role: 'reload',
        accelerator: 'Alt+R',
      },
    ],
  });
}

if (process.platform === 'darwin') {
  const name = app.getName();
  template.unshift({ label: name });
}

const menu = Menu.buildFromTemplate(template);
module.exports = menu;
