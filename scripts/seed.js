const dotenv = require('dotenv');
const fs = require('fs');
const pg = require('pg');
const { exit } = require('process');

dotenv.config();

const dbConfig = {
  connectionString: process.env.DB_URL,
};

const client = new pg.Client(dbConfig);
client.connect();

// Seed the database using ./data/seed.sql
const seed = fs.readFileSync('./data/seed.sql').toString();
client.query(seed, (err, result) => {
  if (err) {
    console.log(err);
    exit();
  } else {
    console.log('Database seeded');
    exit();
  }
});
