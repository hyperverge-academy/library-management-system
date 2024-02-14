const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/healthRouter');
const memberRoutes = require('./routes/memberRoutes');
const bookRoutes = require('./routes/bookRoutes');
const issueReturnRoutes = require('./routes/issueReturnRoutes'); 

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use(memberRoutes);
app.use(bookRoutes);
app.use(issueReturnRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
