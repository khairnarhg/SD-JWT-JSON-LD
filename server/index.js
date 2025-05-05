const express = require('express');
const app = express();
const vcRequest = require('./routes/vcRequest');

app.use(express.json());
app.use('/api', vcRequest);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
