import fs from 'fs';
import path from 'path';
import type { Options as SequelizeConfig } from 'sequelize';

async function sqlite(config: SequelizeConfig) {
  const { storage } = config;

  if (!storage) {
    console.log('Database location is not defined, returning...');
    return;
  }

  // Do not create db if it stored in memory
  if (storage.toLowerCase() === 'memory') return;

  const filePath = path.resolve(storage);

  if (fs.existsSync(filePath)) return;

  const connector = (await import('sqlite3')).default;

  const connection = new connector.Database(filePath);

  connection.close();
}

export = sqlite;
