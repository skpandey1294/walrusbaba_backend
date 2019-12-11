const pg = require('pg');
const sql = require('sql');

let usersToInsert = JSON.parse(
  `[{"party_name":"abc", "president":"swe"}, {"party_name":"xyz", "president":"Tester"}]`
);

let User = sql.define({
  name: 'mydb',
  columns: ['party_name', 'president']
});

async function run() {
  let client;
  try {
    client = new pg.Client({
      connectionString: 'postgresql://postgres:test123@localhost:5432/api'
    });
    await client.connect();
    let query = User.insert(usersToInsert).toQuery();
    console.log(query);
    let { rows } = await client.query(query);
    console.log(rows);
  } catch (e) {
    console.error(e);
  } finally {
    client.end();
  }
}

run();
