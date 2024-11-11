const { Sequelize } = require('sequelize');
const configs = require('./database');
const env = process.env.NODE_ENV || 'development';
const config = configs[env];

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, {
    ...config,
  });
} else {
  const url = `${config.dialect || 'postgres'}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
  sequelize = new Sequelize(url, {
    ...config,
  });
}

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  testConnection
};