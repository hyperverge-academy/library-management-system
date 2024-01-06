const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/healthRouter');
const memberRoutes = require('./routes/memberRoutes');

const app = express();
const port = 8000;

app.use(bodyParser.json());
// app.use(express.json()); // You can choose one, either bodyParser or express.json()
app.use(routes);
app.use(memberRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

