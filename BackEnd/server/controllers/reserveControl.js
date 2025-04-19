const Reservation = require('../models/reservation');
const User = require('../models/User');
const Room = require('../models/Room')

const nodemailer = require('nodemailer');
const config = require('../../config');


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
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email.user,
          pass: config.email.password,
        },
      });

      const reservationWithDetails = await Reservation.findById(newReservation._id);

      const user = await User.findById(newReservation.userId);

      const room = await Room.findById(newReservation.roomId);

    const mailOptions = {
      from: config.email.user,
      to: user.email,
      subject: 'Confirmation de votre réservation',
      html: `
        <h1>Confirmation de réservation</h1>
        <p>Bonjour ${user.fullName},</p>
        <p>Votre réservation a bien été enregistrée :</p>
        <ul>
          <li>Référence de reservation: ${newReservation._id}</li>
          <li>numero de la Chambre: ${room.roomNumber}</li>
          <li>Arrivée: ${new Date(checkInDate).toLocaleDateString()}</li>
          <li>Départ: ${new Date(checkOutDate).toLocaleDateString()}</li>
          <li>Prix total: ${totalPrice} €</li>
        </ul>
        <p>Merci pour votre confiance !</p>
      `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email de confirmation envoyé");
      } catch (emailError) {
        console.error("Erreur d'envoi d'email:", emailError);
        // Ne pas renvoyer d'erreur au client pour un échec d'email
      }

    res.status(201).json(newReservation);
      
    }
    catch(error){
        console.error("Erreur lors de la création:", error);
    res.status(500).json({ 
      message: "Erreur lors de la création de la réservation",
      error: error.message 
    });
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

