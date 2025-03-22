import settingsService from "../services/settingsService.js";

export default  class SettingsController{

  constructor(settingsService){
    this.settingsService = settingsService;
  };

  async get(req, res){
    try {
      const settings = await this.settingsService.find(); 
      if (!settings) return res.status(404).json({ message: 'Paramètres non trouvés' }); 
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

  async update(req, res){
    try {
      const settings = await this.settingsService.update({}, req.body);
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }
}