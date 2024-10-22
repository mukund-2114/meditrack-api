const Test = require("../models/Test");

const getTestsByPatientId = async(req,res)=>{
    try {
        const test = await Test.findOne({ patientId: req.params.patientId });
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

const addTest = async(req, res)=>{
    const { dataType, reading } = req.body;
  
    // Logic to determine critical condition based on the reading
    let criticalFlag = false;
    if (
      (dataType === 'Blood Pressure' && (reading < '50/90' || reading > '160/100')) ||
      (dataType === 'Respiratory Rate' && (reading < 12 || reading > 25)) ||
      (dataType === 'Blood Oxygen Level' && reading < 90) ||
      (dataType === 'Heartbeat Rate' && (reading < 40 || reading > 120))
    ) {
      criticalFlag = true;
    }
  
    try {
      const newTest = new Test({
        dataType,
        reading,
        patient: req.params.patientId,
        criticalFlag
      });
      await newTest.save();
      res.json(newTest);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getCriticalPatients = async (req, res) => {
    try {
      const criticalTests = await Test.find({ criticalFlag: true }).populate('patient');
      res.json(criticalTests);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  module.exports = {
    getTestsByPatientId,
    addTest,
    getCriticalPatients
  };