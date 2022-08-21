const { app } = require('electron');
const path = require('path');
const fs = require('fs');

module.exports = class Storage {
  static put(key, payload) {
    const folder = app.getPath('userData');
    const filePath = path.join(folder, key + '.json');
    fs.writeFileSync(filePath, payload, 'utf8');
  }
}
