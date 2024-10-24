const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllPatients, getPatientById, addPatient } = require('../controllers/patientController');

// Get all patients
router.get('/', getAllPatients);

// Get patient by ID
router.get('/:id', auth, getPatientById);

// Add new patient
router.post('/', auth, addPatient);

module.exports = router;
