const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

/**
 * Demo checklist templates and results.
 * Replace with DB-backed templates per job/asset.
 */
const demoChecklistTemplate = {
  id: 'tmpl-ppm-split-generic',
  name: 'PPM - Generic Split AC',
  items: [
    {
      id: 'item-1',
      label: 'Check and clean indoor filters',
      type: 'PASS_FAIL',
      required: true
    },
    {
      id: 'item-2',
      label: 'Suction pressure',
      type: 'NUMBER',
      unit: 'bar',
      required: true
    },
    {
      id: 'item-3',
      label: 'Discharge pressure',
      type: 'NUMBER',
      unit: 'bar',
      required: true
    },
    {
      id: 'item-4',
      label: 'Visual inspection of pipework and insulation',
      type: 'PASS_FAIL',
      required: true
    }
  ]
};

let demoChecklistResults = {}; // keyed by jobChecklistId

router.get('/job/:jobId', requireAuth, (req, res) => {
  const { jobId } = req.params;
  const jobChecklistId = `jc-${jobId}`;
  const existing = demoChecklistResults[jobChecklistId] || {};
  const items = demoChecklistTemplate.items.map(it => ({
    ...it,
    valueBoolean: existing[it.id]?.valueBoolean ?? null,
    valueNumber: existing[it.id]?.valueNumber ?? null,
    valueString: existing[it.id]?.valueString ?? '',
    notes: existing[it.id]?.notes ?? ''
  }));

  res.json({
    jobChecklistId,
    templateName: demoChecklistTemplate.name,
    items
  });
});

router.post('/:jobChecklistId/save', requireAuth, (req, res) => {
  const { jobChecklistId } = req.params;
  const { items } = req.body;
  demoChecklistResults[jobChecklistId] = demoChecklistResults[jobChecklistId] || {};
  items.forEach(item => {
    demoChecklistResults[jobChecklistId][item.id] = {
      valueBoolean: item.valueBoolean ?? null,
      valueNumber: item.valueNumber ?? null,
      valueString: item.valueString ?? '',
      notes: item.notes ?? ''
    };
  });
  res.json({ message: 'Checklist saved', jobChecklistId });
});

module.exports = router;
