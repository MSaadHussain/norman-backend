const express = require('express');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const router = express.Router();

/**
 * Simple in-memory demo user.
 * Replace with real DB lookup in production.
 */
const demoUser = {
  id: 'eng-1',
  email: 'engineer@example.com',
  password: 'password123', // NEVER store plain passwords in production
  role: 'ENGINEER',
  fullName: 'Demo Engineer'
};

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Basic demo auth
  if (email !== demoUser.email || password !== demoUser.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { sub: demoUser.id, role: demoUser.role },
    jwtSecret,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    user: {
      id: demoUser.id,
      fullName: demoUser.fullName,
      role: demoUser.role,
      email: demoUser.email
    }
  });
});

module.exports = router;
