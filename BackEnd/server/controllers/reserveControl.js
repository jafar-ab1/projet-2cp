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

exports.creatReservation = async(req, res) =>{
  const email = req.user.email;
  const {checkInDate, checkOutDate, roomsRequested} = req.body; //roomsRequested est un tableau [type, quantite]
    
  try {
      // 1. Vérification de l'utilisateur (obligatoire)
      const userValide = await User.findOne({ email });
      if (!userValide) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
      }


    // 2. Trouver les chambres déjà réservées pendant cette période
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    // Validate date objects
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

    // Validate date sequence
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

    // Rest of your existing room availability logic...
    const conflictingReservations = await Reservation.find({
      $or: [
        { checkInDate: { $gte: startDate, $lt: endDate } },
        { checkOutDate: { $gt: startDate, $lte: endDate } },
        { checkInDate: { $lte: startDate }, checkOutDate: { $gte: endDate } }
      ],
      status: { $in: ["Due in", "Checked in", "Due out"] }
    });


    // 4. Traitement pour chaque type de chambre demandé
    const reservations = [];
    let totalPrice = 0;

    for (const request of roomsRequested) {
      const { type, quantity } = request;

      // Trouver toutes les chambres de ce type
      const allRoomsOfType = await Room.find({ type });
      if (!allRoomsOfType || allRoomsOfType.length === 0) {
        return res.status(404).json({ message: `Aucune chambre de type ${type} n'existe` });
      }
    

    // 4. Filtrer pour garder seulement les chambres disponibles
    const availableRooms = allRoomsOfType.filter(room => 
      !conflictingReservations.some(res => res.roomNumber.toString() === room.roomNumber.toString())
    );
  
    if (availableRooms.length < quantity) {
        return res.status(400).json({ 
          message: `Seulement ${availableRooms.length} chambre(s) de type ${type} disponible(s), mais ${quantity} demandée(s)`
        });
      }


  // Créer les réservations pour la quantité demandé
      for (let i = 0; i < quantity; i++) {
        const room = availableRooms[i];
        const reservation = await Reservation.create({
          email,
          roomNumber: room.roomNumber,
          checkInDate,
          checkOutDate,
          totalPrice: room.price,
          status: "Due in"
        });
        reservations.push({
      _id: reservation._id,
      roomNumber: room.roomNumber,
      roomType: room.type,  // Stocké temporairement pour l'email
      price: room.price
    });
        totalPrice += room.price;
      }
    }
      
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
      subject: 'Confirmation de vos réservations',
      html: `
        <h1>Confirmation de réservation</h1>
        <p>Bonjour ${user.fullName},</p>
        <p>Vos réservations ont bien été enregistrées :</p>
        <ul>
          <li>Nombre de chambres: ${reservations.length}</li>
          <li>Arrivée: ${new Date(checkInDate).toLocaleDateString()}</li>
          <li>Départ: ${new Date(checkOutDate).toLocaleDateString()}</li>
          <li>Prix total: ${totalPrice} €</li> <!-- Ajout du prix total -->
        </ul>
        <h3>Détails des chambres :</h3>
        <ul>
          ${reservations.map(res => `
            <li>
               Chambre ${res.roomNumber} (${res.roomType})<br>
              <br>Référence: ${res._id}
            </li>
          `).join('')}
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

    res.status(201).json({
      success: true,
      message: `${reservations.length} chambre(s) réservée(s) avec succès`,
      reservations,
      totalPrice
    });
      
    }
    catch(error){
        console.error("Erreur lors de la création:", error);
    res.status(500).json({ 
      message: "Erreur lors de la création de la réservation",
      error: error.message 
    });
    }
}

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