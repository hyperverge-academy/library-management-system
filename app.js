const express = require('express');
const routes = require('./routes/healthRouter')

const app = express();
const port = 8000;

app.use(routes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});