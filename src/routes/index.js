const express = require('express');
const authRoutes = require('./auth');
const jobRoutes = require('./jobs');
const checklistRoutes = require('./checklists');
const statusRoutes = require('./status');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/jobs', jobRoutes);
router.use('/checklists', checklistRoutes);
router.use('/status', statusRoutes);

module.exports = router;
