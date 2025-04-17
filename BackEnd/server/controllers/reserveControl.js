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

exports.getCheck_in = async (req,res) => {
    try{
        const todayDate = new Date();
        const startDay = new Date(todayDate);
        startDay.setHours(0,0,0,0);
        const endDay = new Date(todayDate);
        endDay.setHours(23, 59, 59, 999);

        const count = await Reservation.countDocuments({
            checkInDate: {
                $gte: startDay,
                $lte: endDay
            }
        })
        
        res.status(200).json(
            
            count
        )
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.getCheck_out = async (req,res) => {
    try{
        const todayDate = new Date();
        const startDay = new Date(todayDate);
        startDay.setHours(0,0,0,0);
        const endDay = new Date(todayDate);
        endDay.setHours(23, 59, 59, 999);

        const count = await Reservation.countDocuments({
            checkOutDate: {
                $gte: startDay,
                $lte: endDay
            }
        })
        
        res.status(200).json(
            count
        )
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.creatReservation = async(req, res) =>{
    
try {
    await Reservation.collection.dropIndex("reservationId_1");
} catch (e) {
    console.log("Index déjà supprimé ou inexistant");
}
    
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

