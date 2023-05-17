import type { Options as SequelizeConfig } from 'sequelize';

async function mariadb(config: SequelizeConfig) {
  const { database } = config;

  if (!database) {
    console.log('Database name is not defined, returning...');
    return;
  }

  const connector = (await import('mariadb')).default;

  const connection = await connector.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    port: config.port,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ?`, [database]);

  connection.end();
}

export = mariadb;
