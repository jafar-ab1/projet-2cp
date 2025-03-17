const Maintenance = require('../models/Maintenance');

exports.getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find();
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMaintenanceByroomNb = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const maintenance = await Maintenance.findOne({ roomNumber });
    if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createMaintenance = async (req, res) => {
  const { roomNumber, issueDescription, userId, status, resolutionDate } = req.body;
  try {
    const newMaintenance = new Maintenance({ roomNumber, issueDescription, userId, status, resolutionDate });
    await newMaintenance.save();
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateMaintenance = async (req, res) => {
    const { roomNumber } = req.params;
    try {
      const maintenance = await Maintenance.findOneAndUpdate({ roomNumber }, req.body, { new: true });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  exports.deleteMaintenance = async (req, res) => {
    try {
      const { roomNumber } = req.params;
      const maintenance = await Maintenance.findOneAndDelete({ roomNumber });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json({ message: 'Maintenance record deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };