import floorService from "../services/floorService.js";

export default class FloorController {

  constructor(floorService){
    this.floorService= floorService;
  }


  async getAll(req, res){
    try {
      const floors = await this.floorService.findAll();
      res.status(200).json(floors);
    } catch (error) {
      res.status(500).json({ 
        message: error.message
       });
    }
  };

  async getByFloorNb(req, res){
    const {floorNb}= req.params; 
    try {
      const floor = await this.floorService.find( floorNb );
      if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
      res.status(200).json(floor);
    } catch (error) {
      res.status(500).json({ 
        message: error.message
       });
    }
  };

  async create(req, res){
    const { floorNumber, status } = req.body;
  try {
    const newFloor = await this.floorService.create({ floorNumber, status });
    res.status(201).json(newFloor);
  } catch (error) {
    res.status(500).json({ 
      message: error.message
     });
  }
  };

  async update(req, res){
    const {floorNb}= req.params; 
  try {
    const floor = await this.floorService.update(floorNb, req.body);
    if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ 
      message: error.message
     });
  }
  };

  async delete(req, res){
    const {floorNb}= req.params; 
  try {
    const floor = await this.floorService.delete(floorNb);
    if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
    res.status(200).json({ message: 'Étage supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  };

}


