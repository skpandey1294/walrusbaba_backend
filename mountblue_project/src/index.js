const express = require('express');

const app = express();

const partyRoute = require('../src/routes/political_partiesRoute');

require('./routes/clientpkg').connect();

// app.use(express.json());

app.use('/api/', partyRoute);

app.use((err, req, res, next) => {
  //   handleError(err, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
