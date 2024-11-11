require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware.js');
const { sequelize, testConnection } = require('./config/sequelize');


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);
app.use(errorHandler);


app.get("/", async (req, res, next) => {
  try {
    const data = {
      status: "Health Check Success",
      date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Jakarta" }),
      uptime: `${Math.round(process.uptime())} second`
    };
    res.status(200).json({
      msg: "Job Board Services",
      data
    });
  } catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    // process.exit(1);
  }
};

startServer();

module.exports = app;