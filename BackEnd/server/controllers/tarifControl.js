const Tarif = require('../models/Tarif');


exports.getAllTarifs = async (req, res) => {
  try {
    const tarifs = await Tarif.find();
    res.status(200).json(tarifs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTarif = async (req, res) => {
  try {
    const { roomType, price } = req.params; 
    const tarif = await Tarif.findOne({roomType, price});
    if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
    res.status(200).json(tarif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createTarif = async (req, res) => {
  const { roomType, price } = req.body;
  try {
    const newTarif = new Tarif({ roomType, price });
    await newTarif.save();
    res.status(201).json(newTarif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateTarif = async (req, res) => {
  try {
    const { roomType, price } = req.params; 
    const tarif = await Tarif.findOneAndUpdate({roomType, price}, req.body, { new: true });
    if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
    res.status(200).json(tarif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteTarif = async (req, res) => {
  try {
    const { roomType, price } = req.params; 
    const tarif = await Tarif.findOneAndDelete({roomType, price});
    if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
    res.status(200).json({ message: 'Tarif supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};