const Room = require('../models/Room');

exports.getAllRooms = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getRoomByNumber = async(req, res) => {
    try {
        const {roomNumber} = req.params;
        if (!roomNumber) {
            return res.status(400).json({ message: 'type pas trouvé' });
        }

    const rooms = await Room.findOne({roomNumber});
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
        res.status(200).json(rooms);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}

exports.creatRoom = async(req, res) =>{
    const {roomNumber, type,facilities, bedType, status, price, floor} = req.body;
    try{
        const newRoom= new Room({roomNumber,facilities, type, bedType, status, price, floor});
        await newRoom.save();
        res.status(201).json(newRoom);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.modifyRoom = async(req, res) =>{
try{

    const {roomNumber} = req.params;
    if (!roomNumber) {
        return res.status(400).json({ message: 'type pas trouvé' });
    }

    const room = await Room.findOneAndUpdate({roomNumber}, req.body, {new:true});
    if (!room) return res.status(404).json({message:'chambre non trouvé'});
    res.status(200).json(room);
}
catch(error){
    res.status(500).json({ message: error.message });
}
}

exports.suppRoom = async(req, res) => {
    try{
        const {roomNumber} = req.params;
        if (!roomNumber) {
            return res.status(400).json({ message: 'type pas trouvé' });
        };

        const room = await Room.findOneAndDelete({roomNumber});
        if (!room) return res.status(404).json({message: 'chambre non trouvé'});
        res.status(200).json({message: 'room supprimer'});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

