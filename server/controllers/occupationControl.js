export class occupancyController{

  constructor(occupancyService){
    this.occupancyService = occupancyService; 
  }

  async getAll(req, res){
    try {
      const occupancies = await this.occupancyService.find();
      res.status(200).json(occupancies);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async getByMonth(req, res){
    try {
      const { month } = req.params;
      const occupancy = await this.occupancyService.findOne({month});
      if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
      res.status(200).json(occupancy);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async create(req, res){
    const { month, occupancyRate, totalRooms, occupiedRooms, availableRooms } = req.body;
  try {
    const newOccupancy = await this.occupancyService.create({ month, occupancyRate, totalRooms, occupiedRooms, availableRooms });
    res.status(201).json(newOccupancy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  }; 

  async update(req, res){
    try {
      const { month } = req.params; 
      const occupancy = await this.occupancyService.findOneAndUpdate({ month }, req.body, { new: true });
      if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
      res.status(200).json(occupancy);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res){
    try {
      const { month } = req.params;
      const occupancy = await this.occupancyService.findOneAndDelete({month});
      if (!occupancy) return res.status(404).json({ message: 'Statistique non trouvée' });
      res.status(200).json({ message: 'Statistique supprimée' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}