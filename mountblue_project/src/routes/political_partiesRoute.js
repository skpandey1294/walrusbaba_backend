const express = require('express');

const mdl = require('../middleware/module');

const partyRouter = express.Router();

partyRouter.use(express.json());

partyRouter.get('/allparties', mdl.getAllParties);

partyRouter.get('/president/:name', mdl.getPartyByPresidentName);

partyRouter.post('/addnewparty', mdl.addParty);

partyRouter.put('/update', mdl.updatePresident);

partyRouter.delete('/del', mdl.deleteParty);

module.exports = partyRouter;
