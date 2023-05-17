import fs from 'fs';
import path from 'path';
import connector from 'sqlite3';
import type { Options as SequelizeConfig } from 'sequelize';

function sqlite(config: SequelizeConfig) {
  const { storage } = config;

  if (!storage) {
    console.log('Database location is not defined, returning...');
    return;
  }

  // Do not create db if it stored in memory
  if (storage.toLowerCase() === 'memory') return;

  const filePath = path.resolve(storage);

  if (fs.existsSync(filePath)) return;

  const connection = new connector.Database(filePath);

  connection.close();
}

export = sqlite;
