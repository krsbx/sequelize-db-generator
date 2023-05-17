const appRootPath = require('app-root-path');
const path = require('path');

const pkgJson = require(path.resolve(appRootPath.path, 'package.json'));
const baseConfigPath = pkgJson['sequelize-table-generator'];
const configPath = path.resolve(appRootPath.path, baseConfigPath);

module.exports = { pkgJson, baseConfigPath, configPath };
