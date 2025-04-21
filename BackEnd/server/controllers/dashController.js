const Floor = require('../models/Floor');
const Reservation = require('../models/reservation');
const Room = require('../models/Room');
const User = require('../models/User');


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

exports.inHotel = async (req, res) => {
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
            },
            status1:{
                $or: ["Checked in", "Due out"]
            }
        });

        res.status(200).json(  
            count
        )
    }catch (error) {
        res.status(500).json({
            error: error.message
        });
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


exports.countRoomsByStatus1 = async (req, res) => {
    try {
        const {status1} = req.params;
        const statusCounts = await Room.countDocuments({status1});
        res.status(200).json({ 
        status1,
        statusCounts
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.countByType = async(req, res) => {
    try{
        const {type} = req.params;

        const TypeCount = await Room.countDocuments({type});

        res.status(200).json({
            type, 
            TypeCount
        })
    }
 catch (error) {
    res.status(500).json({ message: error.message });
};
}


exports.countRoomsByTypeAndAvailable = async (req, res) => {
    try {
        const {type, status1="Available"} = req.params;

        const Count = await Room.countDocuments({type: type,
            status1: status1
        });
        res.status(200).json({ 
        status:"Available",
        type,
        Count
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.countRoomsByStatus0AndStatus1 = async (req, res) => {
    try {
        const { status0, status1 } = req.params;
        const count = await Room.countDocuments({
            status0, status1
        });

        res.status(200).json({
            status0,
            status1, 
            count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


exports.AddGuest = async (req, res) => {
    try {
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);

        const { email } = req.params;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const reservation = await Reservation.findOne({email})

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

        const checkInDate = new Date(reservation.checkInDate);
        checkInDate.setHours(0, 0, 0, 0);

        if (reservation.status !== "Due in" || checkInDate.getTime() !== today.getTime()) {
            return res.status(400).json({ 
                message: 'La réservation n\'est pas disponible pour enregistrement aujourd\'hui',
            });
        }

        res.status(200).json({
            reservation,
            user,
            room:  roomReserve
    });

    } catch(error){
        res.status(500).json({ message: error.message })
    }
}
