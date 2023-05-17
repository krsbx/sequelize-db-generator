import type { DB_DIALECT } from '../utils/constant';

export type DbDialect = ValueOf<typeof DB_DIALECT>;

export as namespace TableGenerator;
