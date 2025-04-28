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


exports.getReservationByEmail = async(req, res) => {
    try {
    const {email} = req.params;
    
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "user non trouvé"});
    
    const reservation = await Reservation.find({email});

    if (!reservation) return res.status(404).json({ message: 'reservation non trouvé'});
    res.status(200).json(reservation);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};

exports.getReservationByEmailAndRoomNumber = async(req, res) => {
  try {
    const {email, roomNumber} = req.params;
    
    const userValide = await User.findOne({email});
      if (!userValide) return res.status(404).json({message: "user non trouvé"});

      const roomNumberValide = await Room.findOne({roomNumber});
      if (!roomNumberValide) return res.status(404).json({message: "room non trouvé"});
    
    const reservation = await Reservation.findOne({email, roomNumber});

    if (!reservation) return res.status(404).json({ message: 'reservation non trouvé'});
    res.status(200).json(reservation);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


exports.creatReservation = async(req, res) =>{
  const { email, roomNumber, checkInDate, checkOutDate, totalPrice } = req.body;
    
  try {
      // 1. Vérification de l'utilisateur (obligatoire)
      const userValide = await User.findOne({ email });
      if (!userValide) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      // 2. Vérification des conflits de réservation (uniquement si la chambre existe)
      const roomExists = await Room.exists({ roomNumber });
      if (roomExists) {
          const conflictingReservations = await Reservation.find({
              roomNumber,
              $or: [
                  // Cas 1: Nouvelle réservation chevauche une réservation existante
                  {
                      checkInDate: { $lt: new Date(checkOutDate) },
                      checkOutDate: { $gt: new Date(checkInDate) }
                  },
                  // Cas 2: Réservation existante englobe la nouvelle
                  {
                      checkInDate: { $lte: new Date(checkInDate) },
                      checkOutDate: { $gte: new Date(checkOutDate) }
                  }
              ]
          });

          if (conflictingReservations.length > 0) {
              return res.status(400).json({
                  message: "La chambre n'est pas disponible pour ces dates",
                  conflicts: conflictingReservations.map(res => ({
                      id: res._id,
                      period: `${res.checkInDate.toISOString().split('T')[0]} au ${res.checkOutDate.toISOString().split('T')[0]}`
                  }))
              });
          }
      }

      // 3. Validation des dates
      if (new Date(checkInDate) >= new Date(checkOutDate)) {
          return res.status(400).json({ 
              message: "La date de check-out doit être après la date de check-in" 
          });
      }

      // 4. Création de la réservation
      const newReservation = new Reservation({
          email,
          roomNumber,
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
      });
      await newReservation.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email.user,
          pass: config.email.password,
        }
      });

      const user = await User.findOne({email});

      const room = await Room.findOne({roomNumber});
      room.status1 = "Occupied";
      await room.save();

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
  const {email, roomNumber} = req.params;

      const user = await User.findOne({email});
      if (!user) return res.status(404).json({message: "user non trouvé"});

      const roomNumberValide = await Room.findOne({roomNumber});
      if (!roomNumberValide) return res.status(404).json({message: "room non trouvé"});      

    const reservation = await Reservation.findOneAndUpdate({email, roomNumber}, req.body, {new:true});
    if (!reservation) return res.status(404).json({message:'reservation non trouvé'});
    res.status(200).json(reservation);
}
catch(error){
    res.status(500).json({ message: error.message });
}
}


exports.suppReservation = async(req, res) => {
    try{
      const {email, roomNumber} = req.params;

      const user = await User.findOne({email});
      if (!user) return res.status(404).json({message: "user non trouvé"});

      const roomNumberValide = await Room.findOne({roomNumber});
      if (!roomNumberValide) return res.status(404).json({message: "room non trouvé"});      

        const reservation =await  Reservation.findOneAndDelete({email, roomNumber});
        if (!reservation) return res.status(404).json({message: 'reservation non trouvé'});
        res.status(200).json({message: 'reservation supprime'});
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.occupancyMonth = async(req, res) => {

}

