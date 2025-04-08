const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
    try {
      const settings = await Settings.findOne(); 
      if (!settings) return res.status(404).json({ message: 'Paramètres non trouvés' }); 
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
};

exports.updateSettings = async (req, res) => {
    try {
      const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
};