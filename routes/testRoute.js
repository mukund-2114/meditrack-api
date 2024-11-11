const express = require('express');
const router = express.Router();
const { getTestsByPatientId, addTest, getCriticalPatients, editTest, getAllCriticalPatients } = require('../controllers/testController');

// Get all tests for a specific patient
router.get('/:patientId/tests', getTestsByPatientId);

// Add a new test for a specific patient
router.post('/:patientId/tests', addTest);

// Get all critical tests for patients
router.get('/critical', getAllCriticalPatients);

router.put('/:testId', editTest);


module.exports = router;
