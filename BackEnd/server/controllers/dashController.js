const Floor = require('../models/Floor');
const Reservation = require('../models/reservation');
const Room = require('../models/Room');


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


exports.countRoomsByStatus = async (req, res) => {
    try {
        const {status} = req.params;
        const statusCounts = await Room.countDocuments({status});
        res.status(200).json({ 
        status,
        statusCounts
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.countRoomsByType = async (req, res) => {
    try {
        const {type} = req.params;
        const TypeCount = await Room.countDocuments({type});
        res.status(200).json({ 
        type,
        TypeCount
    });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.countRoomsByTypeAndStatus = async (req, res) => {
    try {
        const { type, status } = req.params;
        const count = await Room.countDocuments({
            type, status
        });

        res.status(200).json({
            type,
            status, 
            count
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
