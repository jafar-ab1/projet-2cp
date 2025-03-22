import tarifService from "../services/tarifService.js";

export default class TarifController{
  constructor(tarifService){
    this.tarifService = tarifService;
  }

  async getAll(req, res){
    try {
      const tarifs = await this.tarifService.findAll();
      res.status(200).json(tarifs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async get(req, res){
    try {
      const { roomType, price } = req.params; 
      const tarif = await this.tarifService.find(roomType, price);
      if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
      res.status(200).json(tarif);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res){
    const { roomType, price } = req.body;
  try {
    const newTarif = await this.tarifService.create({ roomType, price });
    res.status(201).json(newTarif);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  }

  async update(req, res){
    try {
      const { roomType, price } = req.body; 
      const tarif = await this.tarifService.update(roomType, price, req.body);
      if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
      res.status(200).json(tarif);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async delete(req, res){
    try {
      const { roomType, price } = req.body; 
      const tarif = await this.tarifService.delete(roomType, price);
      if (!tarif) return res.status(404).json({ message: 'Tarif non trouvé' });
      res.status(200).json({ message: 'Tarif supprimé' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}


