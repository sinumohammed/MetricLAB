require('dotenv').config()

module.exports = {
  port: process.env.PORT,

  mongodb: {
    url: process.env.LOCAL
  },

  authentication: {
    jwtSecret: process.env.JWT_SECRET
  },

  development: {
    url: process.env.DEV_DATABASE_URL,
    username: "metriclab",
    password: "MetricLab",
    database: "metriclab",
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  }
}