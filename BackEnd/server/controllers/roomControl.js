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

exports.getByStatus1 = async(req, res) => {
    const {status1} = req.params;

    if (!status1) {
        return res.status(400).json({ message: 'status pas trouvé' });
    }
    
    try{
        const rooms = await Room.find({status1});
        res.status(200).json(rooms);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}


exports.countAllRooms = async (req, res) => {
    try{
        const {id} = req.params;
        const countRooms = await Room.countDocuments({id});
        res.status(200).json({
            countRooms
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.creatRoom = async(req, res) => {
    try {
        const { roomNumber, type, status0, floor } = req.body;
        
        if (type === "Standard") {
            price = 100;
            facilities = ["Lit connecté réglable par appli",
        "Contrôle vocal Alexa/Google",
        "Douche à chromatothérapie Bluetooth",
        "Tablette tactile centrale",
        "Cosmétiques bio personnalisés",
        "Wi-Fi 4K ultra-rapide",
        "Climatisation intelligente"];

        } else if (type === "Deluxe") {
            price = 200;
            facilities = ["Mur végétal intelligent",
        "Douche à effet forêt sensorielle",
        "Écran artistique numérique",
        "Rituel aromathérapie (5 huiles)",
        "Machine à café barista",
        "Mini-bar gastronomique",
        "Peignoir en fibre de bambou"];

        } else if (type === "Suite") {
            price = 300;
            facilities = ["Plafond étoilé 4K",
        "Station de mixage DJ Pro",
        "Glacière à champagne intelligente",
        "Système holographique 3D",
        "Valet connecté (préparation habits)"];
        }

        const newRoom = new Room({
            roomNumber,
            type,
            status0,
            floor,
            price
        });

        await newRoom.save();
        res.status(201).json(newRoom);
    } catch(error) {
        console.error("Error creating room:", error);
        res.status(500).json({ 
            message: "Failed to create room",
            error: error.message 
        });
    }
}

exports.modifyRoom = async(req, res) =>{
try{

    const {roomNumber} = req.params;
    if (!roomNumber) {
        return res.status(400).json({ message: 'roomNumber pas trouvé' });
    }

    const room = await Room.findOneAndUpdate({roomNumber}, req.body, {new:true});
    if (!room) return res.status(404).json({message:'chambre non trouvé'});
    res.status(200).json(room);

        if (room.type === "Standard") {
            room.price = 100;
        } else if (room.type === "Deluxe") {
            room.price = 200;
        } else if (room.type === "Suite") {
            room.price = 300;
        }
        await room.save();
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



