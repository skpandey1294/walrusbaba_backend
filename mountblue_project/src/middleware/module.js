const model = require('../models/query');
// const Joi = require('joi');
const {
  validationToGetPartyData,
  validationToAddParty,
  validationToUpdatePresident,
  Joi
} = require('../utils/validation');

//  1) Getting All the Parties

const getAllParties = (req, res, next) => {
  model
    .selectAllData(`mydb`)
    .then(data => {
      if (data.rows === 0) {
        res.send(`No Party Present`);
      } else {
        res.send(data.rows);
      }
    })
    .catch(err => res.send(err));
};

//  2) Getting Party Using President Name

const getPartyByPresidentName = (req, res, next) => {
  const president = req.params.name;
  const result = validationToGetPartyData(req.params);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  model
    .selectParty(president)
    .then(data => {
      if (data.rows.length === 0) res.send(`Bad Request`);
      else res.send(data.rows);
    })
    .catch(err => {
      res.send(err);
    });
};

//  3) Adding a New Party

const addParty = (req, res) => {
  const result = validationToAddParty(req.body);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  const party = req.body.party_name;
  const president = req.body.president;
  model
    .addParty(party, president)
    .then(data => {
      res.send(data.rows);
    })
    .catch(err => {
      res.send(err.detail);
    });
};

// 4) Changing President of a Party

const updatePresident = (req, res) => {
  // const schema = {
  //   president: Joi.string()
  //     .min(5)
  //     .required(),
  //   party_name: Joi.string()
  //     .min(10)
  //     .required()
  // };
  // const result = Joi.validate(req.body, schema);
  const result = validationToUpdatePresident(req.body);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  model
    .changingPresident(req.body.president, req.body.party_name)
    .then(data => {
      res.send(`${data.rowCount} row updated`);
    })
    .catch(err => res.send(err));
};

// 5)  delete party

const deleteParty = (req, res) => {
  const schema = {
    party_name: Joi.string().min(10).required
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }
  model
    .deleteParty(req.body.party_name)
    .then(data => {
      if (!data) {
        res.send('Party does not exist');
      } else res.send(data);
    })
    .catch(err => res.send(err));
};

module.exports = {
  getAllParties: getAllParties,
  getPartyByPresidentName: getPartyByPresidentName,
  addParty: addParty,
  updatePresident: updatePresident,
  deleteParty: deleteParty
};
