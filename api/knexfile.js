const dotenv = require('dotenv')
dotenv.load()

// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: process.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: process.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'migrations'
    }
  }
}
