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


exports.getRoomsForReservation = async (req, res) => {
  const { type, checkInDate, checkOutDate } = req.params;

  try {
    // 1. Trouver toutes les chambres du type demandé
    const allRoomsOfType = await Room.find({ type });

    // 2. Trouver les chambres déjà réservées pendant cette période
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const conflictingReservations = await Reservation.find({
      $or: [
        // Réservations qui commencent pendant la période demandée
        { 
          checkInDate: { $gte: startDate, $lt: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        },
        // Réservations qui finissent pendant la période demandée
        { 
          checkOutDate: { $gt: startDate, $lte: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        },
        // Réservations qui englobent la période demandée
        { 
          checkInDate: { $lte: startDate },
          checkOutDate: { $gte: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        }
      ]
    });

    // 3. Extraire les IDs des chambres non disponibles
    const unavailableRoomIds = conflictingReservations.map(res => res.roomNumber.toString());

    // 4. Filtrer pour garder seulement les chambres disponibles
    const availableRooms = allRoomsOfType.filter(room => 
      !unavailableRoomIds.includes(room.roomNumber.toString())
    );


    // 5. Formater la réponse
    const response = availableRooms.map(room => ({
      id: room._id,
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      floor: room.floor,
      facilities: room.facilities,
      currentStatus: room.currentStatus
    }));

    if (response.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Aucune chambre ${type} disponible pour les dates sélectionnées`,
        suggestion: "Modifiez vos dates ou essayez un autre type de chambre"
      });
    }

    res.status(200).json({
      success: true,
      count: response.length,
      availableRooms: response
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la recherche des chambres",
      error: error.message
    });
  }
};

exports.creatReservation = async(req, res) =>{
  const email = req.user.email;
  const {checkInDate, checkOutDate, type} = req.body;
    
  try {
      // 1. Vérification de l'utilisateur (obligatoire)
      const userValide = await User.findOne({ email });
      if (!userValide) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      const allRoomsOfType = await Room.find({ type });
      if (!allRoomsOfType || allRoomsOfType.length === 0) {
        return res.status(404).json({ message: "Aucune chambre de ce type n'existe" });
      }

    // 2. Trouver les chambres déjà réservées pendant cette période
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    const conflictingReservations = await Reservation.find({
      $or: [
        // Réservations qui commencent pendant la période demandée
        { 
          checkInDate: { $gte: startDate, $lt: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        },
        // Réservations qui finissent pendant la période demandée
        { 
          checkOutDate: { $gt: startDate, $lte: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        },
        // Réservations qui englobent la période demandée
        { 
          checkInDate: { $lte: startDate },
          checkOutDate: { $gte: endDate },
          status: { $in: ["Due in", "Checked out", "Due out", "Checked in"] }
        }
      ]
    });

    // 3. Extraire les IDs des chambres non disponibles
    const unavailableRoomIds = conflictingReservations.map(res => res.roomNumber.toString());

    // 4. Filtrer pour garder seulement les chambres disponibles
    const availableRooms =  allRoomsOfType.filter(room => 
      !unavailableRoomIds.includes(room.roomNumber.toString() 
    ))
  
    if (availableRooms.length === 0) {
      return res.status(400).json({ 
        message: "Aucune chambre de ce type n'est disponible pour ces dates ou avec le statut requis" 
      });
    }
    
    const availableRoom = availableRooms[0];
    console.log(availableRoom);

      // 4. Création de la réservation
      const newReservation = await Reservation.create({
        email,
        roomNumber: availableRoom.roomNumber,
        checkInDate,
        checkOutDate,
        roomType: availableRoom.type,
        totalPrice: availableRoom.price
      });

      await newReservation.save();
      
      const user = await User.findOne({email});
      
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: config.email.user,
            pass: config.email.password,
          }
        });

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
          <li>numero de la Chambre: ${availableRoom.roomNumber}</li>
          <li>Arrivée: ${new Date(checkInDate).toLocaleDateString()}</li>
          <li>Départ: ${new Date(checkOutDate).toLocaleDateString()}</li>
          <li>Prix total: ${newReservation.totalPrice} €</li>
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

exports.occupancyStatistics = async (req, res) => {
  try {
   
    const year = req.query.year || new Date().getFullYear();
    
    // Obtenir toutes les réservations pour l'année spécifiée
    const reservations = await Reservation.find({
      $and: [
        { checkInDate: { $gte: new Date(`${year}-01-01`) } },
        { checkInDate: { $lte: new Date(`${year}-12-31`) } }
      ]
    });
    
    // Obtenir le nombre total de chambres dans l'hôtel
    const totalRooms = await Room.countDocuments();
    
    // Initialiser un tableau pour stocker les taux d'occupation par mois (index 0-11 pour janvier-décembre)
    const monthlyOccupancy = Array(12).fill(0);
    
    // Calculer l'occupation par mois
    for (let month = 0; month < 12; month++) {
      // Déterminer le premier et dernier jour du mois
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      const daysInMonth = endDate.getDate();
      
      // Compter les chambres occupées pour chaque jour du mois
      let totalOccupiedDays = 0;
      
      // Pour chaque réservation
      reservations.forEach(reservation => {
        const checkIn = new Date(reservation.checkInDate);
        const checkOut = new Date(reservation.checkOutDate);
        
        // Si la réservation chevauche ce mois
        if (checkOut >= startDate && checkIn <= endDate) {
          // Calculer le nombre de jours d'occupation dans ce mois
          const overlapStart = checkIn > startDate ? checkIn : startDate;
          const overlapEnd = checkOut < endDate ? checkOut : endDate;
          
          // Ajouter le nombre de jours d'occupation
          const occupiedDays = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));
          totalOccupiedDays += occupiedDays;
        }
      });
      
      // Calculer le taux d'occupation (nombre de jours-chambres occupés / nombre total de jours-chambres disponibles)
      const totalAvailableDays = totalRooms * daysInMonth;
      monthlyOccupancy[month] = totalAvailableDays > 0 ? 
        (totalOccupiedDays / totalAvailableDays * 100) : 0;
    }
    
    // Préparer les données pour la réponse
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const result = monthNames.map((month, index) => ({
      month,
      occupancyRate: parseFloat(monthlyOccupancy[index].toFixed(2))
    }));
    
    // Envoyer la réponse
    res.status(200).json({
      year: parseInt(year),
      totalRooms,
      occupancyStatistics: result
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};