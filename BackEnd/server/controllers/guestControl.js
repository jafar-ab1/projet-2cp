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
        const firstReservation = successfulReservations[0];

        const mailOptions = {
            from: `"${config.hotel.hotelName}" <${config.email.user}>`,
            to: email,
            subject: `Confirmation de Check-In - ${config.hotel.hotelName}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c3e50;">Bonjour ${user.fullName || ''},</h2>
                    <p>Nous vous confirmons votre enregistrement (Check-In) à l'${config.hotel.hotelName}.</p>
                    
                    <h3 style="color: #2c3e50;">Détails de votre séjour :</h3>
                    <ul>
                        <li><strong>Chambre(s) :</strong> ${roomNumbersList}</li>
                        <li><strong>Date d'arrivée :</strong> ${firstReservation.checkInDate}</li>
                        <li><strong>Date de départ :</strong> ${(firstReservation.checkOutDate)}</li>
                        <li><strong>Statut :</strong> Checked In</li>
                    </ul>
                    
                    <p>Nous vous souhaitons un agréable séjour parmi nous.</p>
                    
                    <p>Cordialement,<br>L'équipe de l'${config.hotel.hotelName}</p>
                    
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
