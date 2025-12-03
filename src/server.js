const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const apiRoutes = require('./routes');

const app = express();

// CORS config: allow your frontend and mobile apps
app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Base API path: /api
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Strath-Air backend API listening on port ${port}`);
  console.log('Base URL for clients: http://localhost:' + port + '/api');
});
