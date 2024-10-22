const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTestsByPatientId, addTest, getCriticalPatients } = require('../controllers/testController');

// Get all tests for a specific patient
router.get('/:patientId/tests', auth, getTestsByPatientId);

// Add a new test for a specific patient
router.post('/:patientId/tests', auth, addTest);

// Get all critical patients
router.get('/critical', auth, getCriticalPatients);

module.exports = router;
