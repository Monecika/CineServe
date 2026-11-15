/**
 * This file creates the single Sequelize instance the whole application shares
 * and does nothing else: no models, no queries. Keeping the connection separate
 * means the models depend on the connection, but the connection depends on
 * nothing, which keeps the import graph free of cycles.
 *
 * Every environment gets its own database, based on NODE_ENV:
 *
 *  - test runs entirely in memory. The database only exists while the process
 *    runs, so a test run can never touch (or be polluted by) your development
 *    data, and there is no file to clean up afterwards. Vitest sets NODE_ENV to
 *    'test' by itself, so this needs no .env.test file.
 *  - every other environment gets its own file in db/, for example
 *    db/database.dev.sqlite.
 *
 * See https://sequelize.org/docs/v6/getting-started/
 */
import {Sequelize} from 'sequelize';

// Without NODE_ENV we assume that we are in development mode.
const environment = process.env.NODE_ENV || 'dev';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: environment === 'test' ? ':memory:' : `db/database.${environment}.sqlite`,

  // Set this to console.log to see every generated and executed SQL statement. Useful for debugging.
  logging: false
});
