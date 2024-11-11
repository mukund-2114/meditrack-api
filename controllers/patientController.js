const Patient = require('../models/Patient');

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new patient
const addPatient = async (req, res) => {
  const { name, dob, gender, address, contactNumber } = req.body;
  try {
    const newPatient = new Patient({
      name,
      dob,
      gender,
      address,
      contactNumber,
    });
    await newPatient.save();
    res.json(newPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a patient by ID
const updatePatient = async (req, res) => {
  const { name, dob, gender, address, contactNumber } = req.body;
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { name, dob, gender, address, contactNumber },
      { new: true } // return the updated document
    );
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a patient by ID
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllPatients, getPatientById, addPatient, updatePatient, deletePatient };
