const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    testDate: { type: Date, default: Date.now },
    dataType: { type: String, enum: ['Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level', 'Heartbeat Rate'], required: true },
    reading: { type: String, required: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    criticalFlag: { type: Boolean, default: false }
})
module.exports = mongoose.model('Test', TestSchema)