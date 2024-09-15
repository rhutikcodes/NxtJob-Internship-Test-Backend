/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2', // Use 'mysql2' for MySQL
    connection: {
      host: '127.0.0.1:3306',
      user: 'root',
      password: process.env.DB_PASSWORD, // Replace with your MySQL password
      database: 'mydatabase' // Replace with your database name
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql2', // Use 'mysql2' for MySQL
    connection: {
      host: '127.0.0.1:3306',
      user: 'root',
      password: process.env.DB_PASSWORD, // Replace with your MySQL password
      database: 'mydatabase' // Replace with your database name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2', // Use 'mysql2' for MySQL
    connection: {
      host: '127.0.0.1:3306',
      user: 'root',
      password: process.env.DB_PASSWORD, // Replace with your MySQL password
      database: 'mydatabase' // Replace with your database name
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
