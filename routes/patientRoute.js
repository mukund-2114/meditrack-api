const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');

// Get all patients
router.get('/', getAllPatients);

// Get patient by ID
router.get('/:id', getPatientById);

// Add new patient
router.post('/', addPatient);

// Update patient by ID
router.put('/:id', updatePatient);

// Delete patient by ID
router.delete('/:id', deletePatient);

module.exports = router;
