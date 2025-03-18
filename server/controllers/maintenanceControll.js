export class maintenanceController{

  constructor(maintenanceService){
    this.maintenanceService = maintenanceService;
  }

  async getAll(req, res){
    try {
      const maintenance = await this.maintenanceService.find();
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ 
        message: error.message 
      });
    }
  };

  async getByRoomNb(req, res){
    try {
      const { roomNumber } = req.params;
      const maintenance = await this.maintenanceService.findOne({ roomNumber });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ 
        message: error.message
       });
    }
  };

  async create(req, res){
    const { roomNumber, issueDescription, userId, status, resolutionDate } = req.body;
  try {
    const newMaintenance = await this.maintenanceService.create({ roomNumber, issueDescription, userId, status, resolutionDate });
    res.status(201).json(newMaintenance);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
  };

  async update(req, res){
    try {
      const maintenance = await this.maintenanceService.findOneAndUpdate({ roomNumber }, req.body, { new: true });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json(maintenance);
    } catch (error) {
      res.status(500).json({ 
        message: error.message
       });
    }
  };

  async delete(req, res){
    try {
      const { roomNumber } = req.params;
      const maintenance = await this.maintenanceService.findOneAndDelete({ roomNumber });
      if (!maintenance) return res.status(404).json({ message: 'Maintenance record not found' });
      res.status(200).json({ message: 'Maintenance record deleted' });
    } catch (error) {
      res.status(500).json({ 
        message: error.message
       });
    }
  }
}
