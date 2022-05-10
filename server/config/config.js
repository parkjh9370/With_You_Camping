const config = require('../config.js');

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mysql',
  }, 
  test: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mysql',
  }, 
  production: {
    username: config.rds.username,
    password: config.rds.password,
    database: config.rds.database,
    host: config.rds.host,
    dialect: 'mysql',
    port: config.rds.port
  },
};
