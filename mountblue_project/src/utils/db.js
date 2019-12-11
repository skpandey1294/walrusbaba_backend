const Faker = require('faker');
const { Client } = require('pg');
const sql = require('sql');

let usersToInsert, User, query, client;

const connectionString = 'postgresql://postgres:test123@localhost:5432/api';

async function createTable(tblName, column1, column2) {
  try {
    client = new Client({
      connectionString: connectionString
    });

    await client.connect();

    await client.query(`DROP TABLE IF EXISTS ${tblName}`);
    await client.query(
      `CREATE TABLE ${tblName} (party_name VARCHAR(30) PRIMARY KEY, president VARCHAR(30) NOT NULL)`
    );
    User = await sql.define({
      name: `${tblName}`,
      columns: [`${column1}`, `${column2}`]
    });

    query = await User.insert(usersToInsert).toQuery();
    await client.query(query);
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}
createTable('mydb', 'party_name', 'president');

function fakeDataGenerator(limit) {
  let fakeDetails = [];
  for (let index = 0; index < limit; index++) {
    fakePartyData = {
      party_name: `${Faker.address.city()} party`,
      president: Faker.name.findName()
    };
    fakeDetails.push(fakePartyData);
  }

  usersToInsert = fakeDetails;
}
fakeDataGenerator(3);
