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

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${port}/api`);
});
