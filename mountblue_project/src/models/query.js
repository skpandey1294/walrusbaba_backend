const client = require('../routes/clientpkg');

const selectAllData = tblName => client.query(`select * from ${tblName}`);

const selectParty = name =>
  client.query('select * from mydb where president = $1', [name]);

const addParty = (party, president) =>
  client.query(
    `INSERT INTO mydb (party_name, president) VALUES ($1, $2) RETURNING *`,
    [party, president]
  );

const changingPresident = (president, party_name) =>
  client.query(`UPDATE mydb SET president = $1 WHERE party_name = $2`, [
    president,
    party_name
  ]);

const deleteParty = party_name =>
  client.query(`DELETE FROM mydb WHERE party_name = $1`, [party_name]);

module.exports = {
  selectAllData: selectAllData,
  selectParty: selectParty,
  addParty: addParty,
  changingPresident: changingPresident,
  deleteParty: deleteParty
};
