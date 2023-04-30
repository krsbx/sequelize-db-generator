import connector from 'pg';
import type { Options as SequelizeConfig } from 'sequelize';

function isDatabaseExist({
  connection,
  database,
}: {
  connection: connector.Client;
  database: string;
}) {
  return new Promise<boolean>((resolve) => {
    const dbNames = `SELECT FROM pg_database WHERE datname = '${database}'`;
    const query = `SELECT 'CREATE DATABASE ${database}' WHERE NOT EXISTS (${dbNames})`;

    connection.query(query, (err, res) => {
      const isExist = !!err || !res.rows.length;
      resolve(isExist);

      if (isExist) return connection.end();
    });
  });
}

async function postgres(config: SequelizeConfig) {
  const { database } = config;

  if (!database) {
    console.log('Database name is not defined, returning...');
    return;
  }

  const connection = new connector.Client({
    host: config.host,
    user: config.username,
    password: config.password,
    port: config.port,
  });

  await connection.connect();

  const isExist = await isDatabaseExist({
    connection,
    database,
  });

  if (isExist) return;

  return new Promise<void>((resolve, reject) => {
    connection.query(`CREATE DATABASE "${database}"`, async (err) => {
      if (err) {
        reject(err);

        return connection.end();
      }

      resolve();
      return connection.end();
    });
  });
}

export = postgres;
