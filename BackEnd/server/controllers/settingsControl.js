const Settings = require('../models/Settings');

exports.getSettings = async (req, res) => {
    try {
      const settings = await Settings.find(); 
      if (!settings) return res.status(404).json({ message: 'Paramètres non trouvés' }); 
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
};

exports.createSettings = async (req,res) => {

  try{
    const {hotelName, totalRooms, defaultRates, contactEmail, contactPhone} = req.body;
    const newSetting = new Settings({hotelName, totalRooms, defaultRates, contactEmail, contactPhone});
    await newSetting.save();
        res.status(201).json(newSetting);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.updateSettings = async (req, res) => {
    try {
      const {hotelName} = req.params;
      const settings = await Settings.findOneAndUpdate({hotelName}, req.body, { new: true, upsert: true });
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
};