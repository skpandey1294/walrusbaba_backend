const { Client } = require('pg');

client = new Client({
  connectionString: 'postgresql://postgres:test123@localhost:5432/api'
});

module.exports = client;
