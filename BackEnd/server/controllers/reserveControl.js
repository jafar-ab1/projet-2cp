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
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    
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


    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // 3. Trouver les réservations en conflit
    const conflictingReservations = await Reservation.find({
      $or: [
        { checkInDate: { $gte: startDate, $lt: endDate } },
        { checkOutDate: { $gt: startDate, $lte: endDate } },
        { checkInDate: { $lte: startDate }, checkOutDate: { $gte: endDate } }
      ],
      status: { $in: ["Due in", "Checked in", "Due out"] }
    });

    // 4. Traitement des réservations
    const reservations = [];
    let totalPrice = 0;
    const roomDetails = []; // Pour stocker les infos des chambres

    for (const request of roomsRequested) {
      const { type, quantity } = request;

      // Trouver toutes les chambres de ce type
      const allRoomsOfType = await Room.find({ type });
      if (!allRoomsOfType || allRoomsOfType.length === 0) {
        return res.status(404).json({ message: `Aucune chambre de type ${type} disponible` });
      }

      // Filtrer les chambres disponibles
      const availableRooms = allRoomsOfType.filter(room =>
        !conflictingReservations.some(res => res.roomNumber.toString() === room.roomNumber.toString())
      );

      if (availableRooms.length < quantity) {
        return res.status(400).json({
          message: `Seulement ${availableRooms.length} chambre(s) de type ${type} disponible(s)`
        });
      }

      // Créer les réservations
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

    let countStandard =0;
    let countDeluxe =0;
    let countSuite =0;
    let total=0;
    const guest = adults + childrens;

    for (const request of roomsRequested){

      if (request.type=== "Standard"){
        capacity=2;
        countStandard= capacity*request.quantity;
      }
      else if (request.type=== "Deluxe"){
        capacity=2;
        countDeluxe= capacity*request.quantity;
      }
      else if (request.type= "Suite"){
        capacity=4;
        countSuite= capacity*request.quantity;
      }
      total = countStandard+countDeluxe+countSuite;
    }
    console.log(total);
    if (total<guest) return res.status(404).json({message : "capacity reserver non compatible avec numero de guest"})



    // 5. Envoi de l'email de confirmation
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
      subject: `réservation - ${config.hotel.hotelName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style type="text/css">
        /* Base Styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7f7f7;
        }
        
        /* Email Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        /* Header */
        .email-header {
            background: linear-gradient(135deg, #2c3e50, #4a6491);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .hotel-logo {
            max-width: 150px;
            height: auto;
        }
        
        /* Content */
        .email-content {
            padding: 30px;
        }
        
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .booking-details {
            background: #f8fafc;
            border-left: 4px solid #3498db;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 5px 5px 0;
        }
        
        .detail-item {
            margin-bottom: 10px;
            display: flex;
        }
        
        .detail-label {
            font-weight: 600;
            min-width: 120px;
            color: #2c3e50;
        }
        
        /* Room List */
        .room-list {
            margin: 20px 0;
        }
        
        .room-item {
            padding: 12px 0;
            border-bottom: 1px solid #eaeaea;
            display: flex;
            justify-content: space-between;
        }
        
        /* Footer */
        .email-footer {
            background: #2c3e50;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        
        .social-links {
            margin: 15px 0;
        }
        
        .social-icon {
            margin: 0 10px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-content {
                padding: 20px;
            }
            
            .detail-item {
                flex-direction: column;
            }
            
            .detail-label {
                margin-bottom: 5px;
            }
        }
    </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Confirmation de réservation</h1>
                </div>
                <div class="email-content">
                    <p>Bonjour ${user.fullName || 'Cher Client'},</p>
                    <p>Votre réservation a bien été enregistrée :</p>
                    
                    <div class="booking-details">
                        <h3>Détails du séjour</h3>
                        <p><strong>Dates :</strong> ${startDate.toLocaleDateString('fr-FR')} au ${endDate.toLocaleDateString('fr-FR')}</p>
                        <p><strong>Total :</strong> ${totalPrice} €</p>
                        
                        <h4>Chambres réservées :</h4>
                        <ul>
                            ${roomDetails.map(room => `
                                <li>
                    Chambre ${room.number} (${room.type}) - ${room.price} € / nuit × ${room.nights} nuit(s) = ${room.total} €
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <p>Nous vous remercions pour votre confiance.</p>
                </div>
                <div class="email-footer">
                    <p>${config.hotel.hotelName}</p>
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

    // 6. Réponse finale
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