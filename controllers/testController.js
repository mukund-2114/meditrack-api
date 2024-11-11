const mongoose = require('mongoose');
const Patient = require('../models/Patient'); // Import Patient model
const Test = require('../models/Test'); // Import Test model

// Get all tests for a specific patient
const getTestsByPatientId = async (req, res) => {
  try {
    // Find tests by the patientId passed as a parameter
    const tests = await Test.find({ patient: req.params.patientId }).populate('patient');
    
    if (!tests || tests.length === 0) {
      return res.status(400).json({ message: 'No tests found for this patient' });
    }

    // Return the list of tests for the patient
    res.json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new test for a specific patient
const addTest = async (req, res) => {
  const { dataType, reading } = req.body;
  
  // Convert reading to a number
  const readingValue = parseFloat(reading);
  
  // Determine if the reading is in a critical range
  let criticalFlag = false;
  if (
    (dataType === 'Blood Pressure' && (readingValue < 50 || readingValue > 160)) ||
    (dataType === 'Respiratory Rate' && (readingValue < 12 || readingValue > 25)) ||
    (dataType === 'Blood Oxygen Level' && readingValue < 90) ||
    (dataType === 'Heartbeat Rate' && (readingValue < 40 || readingValue > 120))
  ) {
    criticalFlag = true;
  }

  try {
    // Create a new Test document for the patient
    const newTest = new Test({
      dataType,
      reading,
      patient: req.params.patientId,
      criticalFlag,
    });
    await newTest.save();

    // Find the patient and check if they have any critical tests
    const patient = await Patient.findById(req.params.patientId);
    const criticalTest = await Test.findOne({
      patient: req.params.patientId,
      criticalFlag: true,
    });

    // Update patient status based on critical tests
    if (criticalTest) {
      patient.status = 'Critical';
    } else {
      patient.status = 'Stable';
    }

    // Save updated patient status
    await patient.save();

    // Return the newly added test as a response
    res.json(newTest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all critical tests for patients
// Route to get all critical patients
const getAllCriticalPatients = async(req, res) => {
  try {
    const criticalPatients = await Patient.find({ status: 'Critical' })
    res.status(200).json(criticalPatients);
  } catch (error) {
    console.error('Error fetching critical patients:', error);
    res.status(500).json({ message: 'Error fetching critical patients' });
  }
};

// Edit an existing test
const editTest = async (req, res) => {
  const { dataType, reading } = req.body;
  
  // Convert reading to a number
  const readingValue = parseFloat(reading);

  // Determine if the updated reading is critical
  let criticalFlag = false;
  if (
    (dataType === 'Blood Pressure' && (readingValue < 50 || readingValue > 160)) ||
    (dataType === 'Respiratory Rate' && (readingValue < 12 || readingValue > 25)) ||
    (dataType === 'Blood Oxygen Level' && readingValue < 90) ||
    (dataType === 'Heartbeat Rate' && (readingValue < 40 || readingValue > 120))
  ) {
    criticalFlag = true;
  }

  try {
    // Find the test by ID and update it
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.testId, 
      { dataType, reading, criticalFlag }, 
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Find the patient and check if they have any critical tests
    const patient = await Patient.findById(updatedTest.patient);

    // Check for any critical tests for the patient
    const criticalTest = await Test.findOne({
      patient: patient._id,
      criticalFlag: true,
    });

    // Update the patient's status based on critical tests
    if (criticalTest) {
      patient.status = 'Critical';
    } else {
      patient.status = 'Stable';
    }

    // Save the updated patient status
    await patient.save();

    // Respond with the updated test data
    res.json(updatedTest);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTestsByPatientId,
  addTest,
  getAllCriticalPatients,

  editTest,
};
