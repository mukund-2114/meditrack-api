const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    address: { type: String },
    contactNumber: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
})

module.exports = mongoose.model('Patient', PatientSchema);