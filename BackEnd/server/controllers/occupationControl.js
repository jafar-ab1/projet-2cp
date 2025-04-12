const Occupancy = require('../models/Occupation');

exports.getAllOccupancies = async (req, res) => {
  try {
    const occupancies = await Occupancy.find();
    res.status(200).json(occupancies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOccupancyByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const occupancy = await Occupancy.findOne({month});
    if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
    res.status(200).json(occupancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createOccupancy = async (req, res) => {
  const { month, occupationRate, totalRooms, occupiedRooms, availbleRooms } = req.body;
  try {
    const newOccupancy = new Occupancy({ month, occupationRate, totalRooms, occupiedRooms, availbleRooms });
    await newOccupancy.save();
    res.status(201).json(newOccupancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateOccupancy = async (req, res) => {
  try {
    const { month } = req.params; 
    const occupancy = await Occupancy.findOneAndUpdate({ month }, req.body, { new: true });
    if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
    res.status(200).json(occupancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteOccupancy = async (req, res) => {
  try {
    const { month } = req.params;
    const occupancy = await Occupancy.findOneAndDelete({month});
    if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
    res.status(200).json({ message: 'Statistique supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};