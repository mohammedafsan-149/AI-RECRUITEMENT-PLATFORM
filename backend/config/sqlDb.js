const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Cloud SQL Database (PostgreSQL / MySQL on Supabase, Neon, Render, Railway, AWS)
  const isPostgres = process.env.DATABASE_URL.startsWith('postgres');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: isPostgres ? 'postgres' : 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: isPostgres
      ? {
          ssl: process.env.DB_SSL === 'false' ? false : { require: true, rejectUnauthorized: false }
        }
      : {}
  });
  console.log(`[SQL DB]: Initialized cloud connection via DATABASE_URL (${isPostgres ? 'PostgreSQL' : 'MySQL'})`);
} else {
  // Local SQLite Zero-Config Database
  const dbPath = path.resolve(__dirname, '../database/recruitment.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false
  });
  console.log(`[SQL DB]: Initialized local SQLite database at: ${dbPath}`);
}

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('[SQL Database Connected Successfully] Ready to store and query platform data.');
  } catch (error) {
    console.error('[SQL Connection Error]:', error.message);
  }
};

module.exports = { sequelize, testConnection };
