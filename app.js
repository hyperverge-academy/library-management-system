const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/healthRouter')
const memberRoutes = require('./routes/memberRoutes');

const app = express();
const port = 8000;

app.use(routes)
app.use(memberRoutes);
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});