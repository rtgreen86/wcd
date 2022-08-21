const { app } = require('electron');
const path = require('path');
const fs = require('fs');

module.exports = class Storage {
  static put(payload) {
    const folder = app.getPath('userData');
    const filePath = path.join(folder, 'data.json');
    return fs.writeFileSync(filePath, payload, 'utf8');
  }
}
