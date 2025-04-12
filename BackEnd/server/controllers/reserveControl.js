const Reservation = require('../models/reservation');

exports.getAllReservations = async (req, res) => {
    try {
      const reservation = await Reservation.find();
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getReservationById = async(req, res) => {
    try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: 'reservation non trouvé'});
    res.status(200).json(reservation);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.creatReservation = async(req, res) =>{
    const {userId, roomId, checkInDate, checkOutDate, totalPrice, status} = req.body;
    try{
        const newReservation= new Reservation({userId, roomId, checkInDate, checkOutDate, totalPrice, status});
        await newReservation.save();
        res.status(201).json(newReservation);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.modifyReservation = async(req, res) =>{
try{
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if (!reservation) return res.status(404).json({message:'reservation non trouvé'});
    res.status(200).json(reservation);
}
catch(error){
    res.status(500).json({ message: error.message });
}
}

exports.suppReservation = async(req, res) => {
    try{
        const reservation =await  Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({message: 'reservation non trouvé'});
        res.status(200).json({message: 'reservation supprime'});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

