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


exports.AddGuest = async (req, res) => {
    try {
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);

        const { email , roomNumber} = req.params;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const reservation = await Reservation.findOne({email, roomNumber})

        if (!reservation) {
            return res.status(404).json({ message: 'Réservation non trouvée' });
        }

       const checkInDate = new Date(reservation.checkInDate);
        checkInDate.setHours(0, 0, 0, 0);

       

        reservation.status = "Checked in";
        await reservation.save();
        const room = await Room.findOne({roomNumber});
        if (!room) return res.status(404).json({message: 'room non trouver pour changer status'});
        room.status1= "Occupied";
        await room.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });

        const mailOptions = {
            from: `"Hotel" <${config.hotel.hotelName}> <${config.email.user}>`,
            to: email,
            subject:`Confirmation de Check-In - Hotel <${config.hotel.hotelName}>`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50;">Bonjour ${user.fullName || ''},</h2>
                    <p>Nous vous confirmons votre enregistrement (Check-In) à l'Hotel Sayé.</p>
                    
                    <h3 style="color: #2c3e50;">Détails de votre séjour :</h3>
                    <ul>
                        <li><strong>Chambre :</strong> ${roomNumber}</li>
                        <li><strong>Date d'arrivée :</strong> ${reservation.checkInDate.toLocaleDateString()}</li>
                        <li><strong>Date de départ :</strong> ${reservation.checkOutDate.toLocaleDateString()}</li>
                        <li><strong>Statut :</strong> Checked In</li>
                    </ul>
                    
                    <p>Nous vous souhaitons un agréable séjour parmi nous.</p>
                    
                    <p>Cordialement,<br>L'équipe de l'Hotel Sayé</p>
                    
                    <div style="margin-top: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <p style="font-size: 12px; color: #7f8c8d;">
                            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'Check-In effectué avec succès et email de confirmation envoyé',
            reservation,
            user: email,
            room:  roomNumber
    });

    } catch(error){
        res.status(500).json({ message: error.message })
    }
}
