const Floor = require('../models/Floor');

exports.getAllFloors = async (req, res) => {
  try {
    const floors = await Floor.find();
    res.status(200).json(floors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFloorByFloorNb = async (req, res) => {
  
  const {floorNumber}= req.params; 
  try {
    const floor = await Floor.findOne( {floorNumber} );
    if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.countFloorStatus = async (req, res) => {
  try{
    const {status} = req.params;
    const { id } = req.params;
    
    const countStatus = await Floor.countDocuments({status});
    const rommCount = await Floor.countDocuments({id});

    const moyenne = (countStatus*100)/rommCount;
    const roundedMoynne = Math.round(moyenne*100)/100;
    res.status(200).json({
      status,
      countStatus,
      moyenne, 
      roundedMoynne
    });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createFloor = async (req, res) => {
  const { floorNumber, status } = req.body;
  try {
    const newFloor = new Floor({ floorNumber, status });
    await newFloor.save();
    res.status(201).json(newFloor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateFloor = async (req, res) => {
  const {floorNumber}= req.params; 
  try {
    const floor = await Floor.findOneAndUpdate({floorNumber}, req.body, { new: true });
    if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
    res.status(200).json(floor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteFloor = async (req, res) => {
  try {
    const {floorNumber}= req.params; 
    const floor = await Floor.findOneAndDelete({floorNumber});
    if (!floor) return res.status(404).json({ message: 'Étage non trouvé' });
    res.status(200).json({ message: 'Étage supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};