const Reservation = require('../models/reservation');
const Room = require('../models/Room');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const config = require('../../config');
const reservation = require('../models/reservation');


exports.getAll = async (req, res) => {
    try{
        const guest =await User.find({role: 'Client'});
        if (!guest) res.status(400).json({message:'guest non trouvé'});
        res.status(200).json(guest)
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}


exports.getAllCheckInDueOut = async (req, res) => {
    try {
        // 1. Trouver toutes les réservations avec les statuts recherchés
        const reservations = await Reservation.find({
            status: { $in: ["Due out", "Checked in"] }
        }).lean(); // Utilisation de lean() pour obtenir des objets JavaScript simples

        if (reservations.length === 0) {
            return res.status(404).json({ 
                message: 'Aucune réservation trouvée avec ces statuts' 
            });
        }

        // 2. Récupérer les emails uniques des clients
        const guestEmails = [...new Set(reservations.map(res => res.email))];

        // 3. Trouver les informations des clients correspondants
        const guests = await User.find({
            email: { $in: guestEmails },
            role: 'Client'
        }).select('fullName email phoneNumber'); // Sélectionner uniquement les champs nécessaires

        // 4. Fusionner les données des réservations avec les informations clients
        const enhancedReservations = reservations.map(reservation => {
            const guestInfo = guests.find(guest => guest.email === reservation.email) || {};
            return {
                ...reservation,
                guestInfo: {
                    fullName: guestInfo.fullName,
                    email: guestInfo.email
                }
            };
        });

        return res.status(200).json({
            count: enhancedReservations.length,
            reservations: enhancedReservations
        });

    } catch (error) {
        console.error("Erreur dans getAllCheckInDueOut:", error);
        return res.status(500).json({ 
            message: "Erreur interne du serveur",
            error: error.message 
        });
    }
};


exports.AddGuest = async (req, res) => {
    try {
        const today = new Date(); 
        today.setHours(0, 0, 0, 0);

        const {email , roomNumber} = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const results = await Promise.all(roomNumber.map(async (roomNumber) => {
            const reservation = await Reservation.findOne({ email, roomNumber });
            
            if (!reservation) {
                return { roomNumber, success: false, message: 'Réservation non trouvée' };
            }

            const checkInDate = new Date(reservation.checkInDate);
            checkInDate.setHours(0, 0, 0, 0);

            // Mise à jour de la réservation
            reservation.status = "Checked in";
            await reservation.save();
            console.log(reservation.status);
            

            // Mise à jour de la chambre
            const room = await Room.findOne({ roomNumber });
            if (!room) {
                return { roomNumber, success: false, message: 'Chambre non trouvée' };
            }

            room.status1 = "Occupied";
            await room.save();

            return { roomNumber, success: true };
        }));

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });

        const successfulReservations = results.filter(r => r.success);
        const roomNumbersList = successfulReservations.map(r => r.roomNumber).join(', ');

        const number=(successfulReservations[0].roomNumber);
        

        const reservation = await Reservation.findOne({ email, roomNumber: number });
        const checkInDate = new Date(reservation.checkInDate);

        const checkOutDate = new Date(reservation.checkOutDate);


        const mailOptions = {
            from: `"${config.hotel.hotelName}" <${config.email.user}>`,
            to: email,
            subject: `Confirmation de Check-In - ${config.hotel.hotelName}`,
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
            <img src="https://example.com/logo.png" alt="${config.hotel.hotelName}" class="hotel-logo">
            <h1 style="margin: 20px 0 0; font-size: 24px;">Confirmation de Check-In</h1>
        </div>
        
        <div class="email-content">
            <div class="greeting">
                <p>Bonjour <strong>${user.fullName || 'Cher Client'}</strong>,</p>
                <p>Nous vous confirmons votre enregistrement à l'hôtel ${config.hotel.hotelName}.</p>
            </div>
            
            <div class="booking-details">
                <h3 style="margin-top: 0; color: #2c3e50;">Détails de votre séjour</h3>
                
                <div class="detail-item">
                    <span class="detail-label">Référence :</span>
                    <span>${reservation._id}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Date d'arrivée :</span>
                    <span>${new Date(checkInDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Date de départ :</span>
                    <span>${new Date(checkOutDate).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div class="detail-item">
                    <span class="detail-label">Statut :</span>
                    <span style="color: #27ae60; font-weight: 600;">Checked In</span>
                </div>
            </div>
            
            <div class="room-list">
                <h4 style="margin-bottom: 15px; color: #2c3e50;">Vos chambres :</h4>
                ${roomNumbersList}
            </div>
            
            <p style="margin-top: 25px;">Nous vous souhaitons un excellent séjour parmi nous. N'hésitez pas à contacter la réception pour toute demande spéciale.</p>
            
            <p style="margin-top: 20px;">À bientôt,</p>
        </div>
        
        <div class="email-footer">
            <p>${config.hotel.hotelName}</p>
            <p>Tél: ${config.hotel.phone} | Email: ${config.hotel.contactEmail}</p>
            
            <p style="font-size: 12px; color: #bdc3c7; margin-top: 20px;">
                Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                <br>
                © ${new Date().getFullYear()} ${config.hotel.hotelName}. Tous droits réservés.
            </p>
        </div>
    </div>
</body>
</html>
`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: 'Check-In effectué avec succès et email de confirmation envoyé',
            user: email,
            room:  roomNumber
    });

    } catch(error){
        res.status(500).json({ message: error.message })
    }
}


exports.editGuest = async (req, res) => {
    try {
        const { email, roomNumber, type } = req.params;

        // 1. Configuration du transporteur email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });


        // 1. Vérification de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // 2. Trouver la réservation active
        const reservation = await Reservation.findOne({
            email,
            roomNumber,
            status: "Checked in"
        });
        if (!reservation) {
            return res.status(404).json({ message: "Aucune réservation active trouvée" });
        }

        const countType = await Room.countDocuments({type: type, status1: "Available"});
        if (countType === 0) {
            return res.status(404).json({ message: "Aucune chambre de ce type trouvée" });
        }

        const newRoom = await Room.findOne({ type: type, status1: "Available" });
        const newRoomNumber = newRoom.roomNumber;

        // 5. Logique de changement de type de chambre
        const roomTypeHierarchy = {
            'Standard': 1,
            'Deluxe': 2,
            'Suite': 3
        };
        const currentRoom = await Room.findOne({ roomNumber: reservation.roomNumber });
        const oldRoomNumber = reservation.roomNumber;

        const currentTypeLevel = roomTypeHierarchy[currentRoom.type];
        const newTypeLevel = roomTypeHierarchy[type];

        // Vérification des règles de changement
        if (newTypeLevel < currentTypeLevel) {
            return res.status(400).json({ 
                message: "Changement non autorisé : vous ne pouvez pas descendre de catégorie de chambre",
                allowedChanges: {
                    currentType: currentRoom.type,
                    allowedNewTypes: Object.keys(roomTypeHierarchy)
                        .filter(type => roomTypeHierarchy[type] >= currentTypeLevel)
                }
            });
        }

        // 6. Vérifier disponibilité de la nouvelle chambre
        const conflictingReservation = await Reservation.findOne({
            roomNumber: newRoomNumber,
            status: { $in: ["Checked in", "Due out"] }
        });
        if (conflictingReservation) {
            return res.status(409).json({ 
                message: "La chambre demandée est déjà occupée",
                availableRooms: await this.findAvailableRooms(currentRoom.type) // Fonction à implémenter
            });
        }

        // 7. Effectuer le changement
        const updatedReservation = await Reservation.findOneAndUpdate(
            { _id: reservation._id },
            { 
                roomNumber: newRoomNumber},
            { new: true }
        );

        // 8. Mettre à jour les statuts des chambres
        await Room.findOneAndUpdate(
            { roomNumber: reservation.roomNumber },
            { status1: "Available" }
        );
        await Room.findOneAndUpdate(
            { roomNumber: newRoomNumber },
            { status1: "Occupied" }
        );

          const mailOptions = {
            from: `"${config.hotel.hotelName}" <${config.email.user}>`,
            to: email,
            subject: `Modification de votre chambre - ${config.hotel.hotelName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
                        .header { background-color: #f8f9fa; padding: 10px; text-align: center; border-bottom: 1px solid #eee; }
                        .content { padding: 20px; }
                        .highlight { color: #e74c3c; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Modification de votre réservation</h2>
                        </div>
                        <div class="content">
                            <p>Bonjour ${user.fullName || 'Client'},</p>
                            <p>Nous vous informons que votre numéro de chambre a été modifié :</p>
                            <p><strong>Ancienne chambre :</strong> ${oldRoomNumber} (${currentRoom.type})</p>
                            <p><strong>Nouvelle chambre :</strong> ${newRoomNumber} (${newRoom.type})</p>
                            ${newTypeLevel > currentTypeLevel ? 
                                `<p class="highlight">Félicitations ! Vous avez été upgradé à une chambre de catégorie supérieure.</p>` : ''}
                            <p>Pour toute question, veuillez contacter la réception.</p>
                            <p>Cordialement,<br>L'équipe de ${config.hotel.hotelName}</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);


        return res.status(200).json({
            message: "Chambre changée avec succès",
            reservation: updatedReservation,
            roomChange: {
                from: currentRoom.roomNumber,
                to: newRoom.roomNumber,
                typeUpgrade: newTypeLevel > currentTypeLevel
            }
        });

    } catch (error) {
        console.error("Erreur dans editGuest:", error);
        return res.status(500).json({ 
            message: "Erreur serveur",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


exports.deleteGuest = async(req, res)=>{
    try{
        const {email} = req.params;
       const user = await User.findOneAndDelete({email});
       if(!user) return res.status(404).json({message : 'client non trouve'});
       res.status(200).json({message : 'user supprimé'});
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel

    }
}
