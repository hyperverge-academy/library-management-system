const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/healthRouter');
const memberRoutes = require('./routes/memberRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(routes);
app.use(memberRoutes);
app.use(bookRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

