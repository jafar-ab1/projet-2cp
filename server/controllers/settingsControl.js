export class settingsController{

  constructor(settingsService){
    this.settingsService = settingsService;
  };

  async get(req, res){
    try {
      const settings = await this.settingsService.findOne(); 
      if (!settings) return res.status(404).json({ message: 'Paramètres non trouvés' }); 
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

  async update(req, res){
    try {
      const settings = await this.settingsService.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.status(200).json(settings); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }
}