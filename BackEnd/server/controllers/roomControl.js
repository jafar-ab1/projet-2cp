const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getRoomById = async(req, res) => {
    try {
    const rooms = await Room.findById(req.params.id);
    if (!rooms) return res.status(404).json({ message: 'chambre non trouvé'});
    res.status(200).json(rooms);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.getByType = async(req, res) => {
    const {type} = req.params;

    if (!type) {
        return res.status(400).json({ message: 'type pas trouvé' });
    }
    
    try{
        const rooms = await Room.find({type});
<<<<<<< HEAD
        if (!rooms) return res.status(404).json({message : 'type non trouvé'});
=======
>>>>>>> 4b203ab9495f15ae9a33adebd112bacfe609fecf
        res.status(200).json(rooms);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

exports.creatRoom = async(req, res) =>{
    const {roomNumber, type, bedType, status, price, floor} = req.body;
    try{
        const newRoom= new Room({roomNumber, type, bedType, status, price, floor});
        await newRoom.save();
        res.status(201).json(newRoom);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.modifyRoom = async(req, res) =>{
try{
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!room) return res.status(404).json({message:'chambre non trouvé'});
    res.status(200).json(room);
}
catch(error){
    res.status(500).json({ message: error.message });
}
}

exports.suppRoom = async(req, res) => {
    try{
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) return res.status(404).json({message: 'chambre non trouvé'});
        res.status(200).json({message: 'room supprimer'});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

