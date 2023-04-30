import type { Options as SequelizeConfig } from 'sequelize';
import connections from './connections';
import { DB_DIALECT } from './utils/constant';

function main(config: SequelizeConfig) {
  switch (config.dialect) {
    case DB_DIALECT.MYSQL:
      return connections.mysql(config);

    case DB_DIALECT.POSTGRES:
      return connections.postgres(config);

    case DB_DIALECT.MARIADB:
      return connections.mariadb(config);

    case DB_DIALECT.SQLITE:
      break;

    case DB_DIALECT.MSSQL:
      break;

    case DB_DIALECT.ORACLE:
      break;

    default:
      console.log('Automatically create database is not supported');
      console.log('Returning, please create the database manually');
      break;
  }
}

export default main;
