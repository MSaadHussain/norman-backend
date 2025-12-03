const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * Demo in-memory jobs. Replace with DB calls.
 */
let demoJobs = [
  {
    id: 'job-1',
    jobNumber: 'SA-0001',
    type: 'PPM',
    status: 'ASSIGNED',
    priority: 'NORMAL',
    siteName: 'Demo Site A',
    siteAddress: '123 High Street, Glasgow',
    scheduledStart: new Date().toISOString(),
    scheduledEnd: null,
    engineerId: 'eng-1'
  }
];

router.get('/my', requireAuth, (req, res) => {
  const engineerId = req.user.id;
  const jobs = demoJobs.filter(j => j.engineerId === engineerId);
  res.json(jobs);
});

router.get('/:id', requireAuth, (req, res) => {
  const job = demoJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

router.post('/:id/start', requireAuth, (req, res) => {
  const job = demoJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  job.status = 'IN_PROGRESS';
  job.actualStart = new Date().toISOString();
  res.json({ message: 'Job started', job });
});

router.post('/:id/complete', requireAuth, (req, res) => {
  const job = demoJobs.find(j => j.id === req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  job.status = 'COMPLETED';
  job.actualEnd = new Date().toISOString();
  const { summary, recommendations } = req.body;
  job.summary = summary;
  job.recommendations = recommendations;
  res.json({ message: 'Job completed', job });
});

module.exports = router;
