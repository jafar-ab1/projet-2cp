const Reservation = require('../models/reservation');
const User = require('../models/User');
const Room = require('../models/Room')

const nodemailer = require('nodemailer');
const config = require('../../config');
const { type } = require('os');


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
  const { checkInDate, checkOutDate } = req.params;

  try {
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date values",
        details: {
        checkInDate: { received: checkInDate, parsed: startDate.toString() },
        checkOutDate: { received: checkOutDate, parsed: endDate.toString() }
        }
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
        dates: {
          checkIn: startDate.toISOString(),
          checkOut: endDate.toISOString()
        }
      });
    }

    const allRoomsOfType = await Room.find();

    const conflictingReservations = await Reservation.find({
      $or: [
        { checkInDate: { $gte: startDate, $lt: endDate } },
        { checkOutDate: { $gt: startDate, $lte: endDate } },
        { checkInDate: { $lte: startDate }, checkOutDate: { $gte: endDate } }
      ],
      status: { $in: ["Due in", "Checked in", "Due out"] }
    });

    const availableRooms = allRoomsOfType.filter(room =>
      !conflictingReservations.some(res => res.roomNumber.toString() === room.roomNumber.toString())
    );

    // Group by type
    const types = ["Standard", "Deluxe", "Suite"];
    const roomsByType = types.map(type => {
      const roomsOfType = availableRooms.filter(room => room.type === type);
      const sampleRoom = roomsOfType[0];

      return {
        type,
        rooms: [{
          count: roomsOfType.length,
          facilities: sampleRoom?.facilities,
          price: sampleRoom?.price,
          bedType: sampleRoom?.bedType,
          price: sampleRoom?.price,
          size: sampleRoom?.size
        }]
      };
    });

    return res.status(200).json({
      success: true,
      roomsByType
    });

  } catch (error) {
    console.error("Room availability error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};



exports.creatReservation = async (req, res) => {
  const email = req.user.email;
  const { checkInDate, checkOutDate, roomsRequested, adults, childrens } = req.body;

  try {
    // 1. Vérification de l'utilisateur
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    // 2. Validation des dates
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Dates invalides",
        details: {
          checkInDate: { received: checkInDate, parsed: startDate.toString() },
          checkOutDate: { received: checkOutDate, parsed: endDate.toString() }
        }
      });
    }

    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: "La date de check-out doit être après la date de check-in"
      });
    }

    // 3. Nombre de nuits
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // 4. Trouver les réservations en conflit
    const conflictingReservations = await Reservation.find({
      $or: [
        { checkInDate: { $gte: startDate, $lt: endDate } },
        { checkOutDate: { $gt: startDate, $lte: endDate } },
        { checkInDate: { $lte: startDate }, checkOutDate: { $gte: endDate } }
      ],
      status: { $in: ["Due in", "Checked in", "Due out"] }
    });

    // 5. Traitement des réservations
    const reservations = [];
    let totalPrice = 0;
    const roomDetails = [];

    for (const request of roomsRequested) {
      const { type, quantity } = request;

      const allRoomsOfType = await Room.find({ type });
      if (!allRoomsOfType || allRoomsOfType.length === 0) {
        return res.status(404).json({ message: `Aucune chambre de type ${type} disponible` });
      }

      const availableRooms = allRoomsOfType.filter(room =>
        !conflictingReservations.some(res => res.roomNumber.toString() === room.roomNumber.toString())
      );

      if (availableRooms.length < quantity) {
        return res.status(400).json({
          message: `Seulement ${availableRooms.length} chambre(s) de type ${type} disponible(s)`
        });
      }

      for (let i = 0; i < quantity; i++) {
        const room = availableRooms[i];
        const roomPrice = room.price * nights;

        const reservation = await Reservation.create({
          email,
          roomNumber: room.roomNumber,
          checkInDate: startDate,
          checkOutDate: endDate,
          totalPrice: roomPrice,
          status: "Due in"
        });

        reservations.push(reservation);
        roomDetails.push({
          number: room.roomNumber,
          type: room.type,
          price: room.price,
          nights,
          total: roomPrice
        });
        totalPrice += roomPrice;
      }
    }

    // 6. Vérification capacité
    let totalCapacity = 0;
    const guestCount = adults + childrens;

    for (const request of roomsRequested) {
      const capacity =
        request.type === "Standard" ? 2 :
        request.type === "Deluxe" ? 2 :
        request.type === "Suite" ? 4 : 0;

      totalCapacity += capacity * request.quantity;
    }

    if (totalCapacity < guestCount) {
      return res.status(400).json({ message: "La capacité des chambres réservées est insuffisante pour le nombre de personnes." });
    }

    // 7. Envoi d'email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });

    const mailOptions = {
      from: `"${config.hotel.hotelName}" <${config.email.user}>`,
      to: user.email,
      subject: `Réservation confirmée - ${config.hotel.hotelName}`,
      html: `
        <html>
        <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .email-container { max-width: 600px; margin: auto; padding: 20px; background: #f7f7f7; border-radius: 8px; }
          .header { background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .room-list { background: #fff; padding: 20px; border-radius: 0 0 8px 8px; }
        </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h2>Confirmation de réservation</h2>
            </div>
            <div class="room-list">
              <p>Bonjour ${user.fullName || 'Client'},</p>
              <p>Votre réservation du <strong>${startDate.toLocaleDateString('fr-FR')}</strong> au <strong>${endDate.toLocaleDateString('fr-FR')}</strong> a bien été prise en compte.</p>
              <p><strong>Nombre de nuits :</strong> ${nights}</p>
              <p><strong>Total payé :</strong> ${totalPrice} €</p>
              <h3>Détails des chambres :</h3>
              <ul>
                ${roomDetails.map(room => `
                  <li>
                    Chambre ${room.number} (${room.type}) - ${room.price} € / nuit × ${room.nights} nuit(s) = ${room.total} €
                  </li>
                `).join('')}
              </ul>
              <p>Merci pour votre réservation.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email de confirmation envoyé");
    } catch (emailError) {
      console.error("Erreur d'envoi d'email:", emailError);
    }

    // 8. Réponse
    res.status(201).json({
      success: true,
      message: `${reservations.length} chambre(s) réservée(s) avec succès`,
      reservations: reservations.map(res => ({
        id: res._id,
        roomNumber: res.roomNumber,
        checkInDate: res.checkInDate,
        checkOutDate: res.checkOutDate,
        status: res.status
      })),
      totalPrice
    });

  } catch (error) {
    console.error("Erreur lors de la création:", error);
    res.status(500).json({
      message: "Erreur lors de la création de la réservation",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


exports.modifyStatusDueOut = async (req, res) => {
  try {
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    
    const reservations = await Reservation.find({ status: 'Checked in' });

    // 3. Filtrer celles dont la date de check-out est aujourd'hui ou antérieure
    const reservationsToUpdate = reservations.filter(reservation => {
      const checkOutDate = new Date(reservation.checkOutDate);
      checkOutDate.setHours(0, 0, 0, 0);
      return checkOutDate = today;
    });

    // 4. Mettre à jour le statut de ces réservations
    const updatePromises = reservationsToUpdate.map(reservation => {
      return Reservation.findByIdAndUpdate(
        reservation._id,
        { status: 'Due out' },
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    return res.status(200).json({
      message: `${reservationsToUpdate.length} réservation(s) mise(s) à jour en "Due out"`,
      updatedCount: reservationsToUpdate.length
    });

  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return res.status(500).json({ 
      message: "Erreur interne du serveur",
      error: error.message 
    });
  }
};


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
   
    const year = req.params.year || new Date().getFullYear();
    
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