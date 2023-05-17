export const DB_DIALECT = {
  MYSQL: 'mysql', // mysql2
  MARIADB: 'mariadb', // mariadb
  SQLITE: 'sqlite', // sqlite3
  POSTGRES: 'postgres', // pg
  MSSQL: 'mssql', // tedious
  ORACLE: 'oracle', // oracledb
} as const;

export const dbDialects: TableGenerator.DbDialect[] = Object.values(DB_DIALECT);
