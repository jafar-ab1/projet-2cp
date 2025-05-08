const Floor = require('../models/Floor');
const Reservation = require('../models/reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const config = require('../../config');


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
    try {
      const todayDate = new Date();
      const startDay = new Date(todayDate);
      startDay.setHours(0, 0, 0, 0);
  
      const endDay = new Date(todayDate);
      endDay.setHours(23, 59, 59, 999);
  
      const count = await Reservation.countDocuments({
        checkInDate: {
          $gte: startDay,
          $lte: endDay
        },
        status: {
          $in: ["Checked in", "Due out"]
        }
      });
  
      res.status(200).json(count);
    } catch (error) {
      console.error("Error in inHotel controller:", error.message);
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
      const { type } = req.params;
  
      const count = await Room.countDocuments({
        type,
        status1: "Available"
      });
  
      res.status(200).json({
        type,
        status1: "Available",
        count
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.countRoomsByStatus0AndStatus1 = async (req, res) => {
    try {
        const {status0, status1} = req.params;
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


