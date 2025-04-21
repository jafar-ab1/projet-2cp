const Maintenance = require('../models/Maintenance');
const Room = require('../models/Room');
const User = require('../models/User');

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

    const room = await Room.findOne({roomNumber});
    if (!room) return res.status(404).json({message: "chambre non trouvé"});


    const maintenance = await Maintenance.find({ roomNumber });
    if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createMaintenance = async (req, res) => {
  const { roomNumber, issueDescription, email, status, resolutionDate } = req.body;
  try {

    const room = await Room.findOne({roomNumber});
    if (!room) return res.status(404).json({message: "chambre non trouvé"});

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "user non trouvé"});

    const newMaintenance = new Maintenance({ roomNumber, issueDescription, email, status, resolutionDate });
    await newMaintenance.save();
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateMaintenance = async (req, res) => {
    const { roomNumber, email } = req.params;
    try {

      const room = await Room.findOne({roomNumber});
      if (!room) return res.status(404).json({message: "chambre non trouvé"});

      const maintenance = await Maintenance.findOneAndUpdate({ roomNumber }, req.body, { new: true });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.deleteMaintenance = async (req, res) => {
    try {
      const { roomNumber, email } = req.params;

      const room = await Room.findOne({roomNumber});
     if (!room) return res.status(404).json({message: "chambre non trouvé"});

      const maintenance = await Maintenance.findOneAndDelete({ roomNumber });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json({ message: 'Maintenance record deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};