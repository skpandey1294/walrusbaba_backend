const Faker = require('faker');
const { Client } = require('pg');
const sql = require('sql');
let count = 1;
let usersToInsert, User, query, client;

const connectionString = 'postgresql://postgres:test123@localhost:5432/api';

async function createTable(tblName, column1, column2, column3, column4) {
  try {
    client = new Client({
      connectionString: connectionString
    });

    await client.connect();

    await client.query(`DROP TABLE IF EXISTS ${tblName}`);
    await client.query(
      `CREATE TABLE ${tblName} (id INT PRIMARY KEY, party_name VARCHAR(30) NOT NULL,cm VARCHAR(30), state VARCHAR(30));`
    );
    User = await sql.define({
      name: `${tblName}`,
      columns: [`${column1}`, `${column2}`, `${column3}`, `${column4}`]
    });

    query = await User.insert(usersToInsert).toQuery();
    await client.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}
createTable('patries_details', 'party_name', 'CM', 'state');

function fakeDataGenerator(limit) {
  let fakeDetails = [];
  for (let index = 0; index < limit; index++) {
    fakePartyData = {
      id: `${count}`,
      party_name: `${Faker.address.city()} party`,
      cm: Faker.name.findName(),
      state: Faker.address.city()
    };
    count++;
    fakeDetails.push(fakePartyData);
  }

  usersToInsert = fakeDetails;
}
fakeDataGenerator(3);
