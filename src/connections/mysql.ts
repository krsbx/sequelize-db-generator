import connector from 'mysql2';
import type { Options as SequelizeConfig } from 'sequelize';

function createConnection(config: SequelizeConfig) {
  const connection = connector.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    port: config.port,
  });

  return new Promise<connector.Connection>((resolve, reject) => {
    connection.connect((err) => {
      if (!err) return resolve(connection);

      reject(err);
    });
  });
}

async function mysql(config: SequelizeConfig) {
  const { database } = config;

  if (!database) {
    console.log('Database name is not defined, returning...');
    return;
  }

  const connection = await createConnection(config);

  return new Promise<void>((resolve, reject) => {
    connection.query(
      `CREATE DATABASE IF NOT EXISTS ?`,
      [config.database],
      (err) => {
        if (err) {
          reject(err);
          return connection.end();
        }

        resolve();
        return connection.end();
      }
    );
  });
}

export = mysql;
