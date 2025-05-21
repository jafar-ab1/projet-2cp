const User = require('../models/User');
const Reservation = require('../models/reservation');
const Settings = require('../models/Settings');
const Room = require('../models/Room');

const nodemailer = require('nodemailer');
const config = require('../../config');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');


exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getUserByEmail = async (req,res)=>{
    try{
        const {email} = req.params;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:'client non trouvé'});
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel
    }
}

exports.modifyUser = async(req, res)=> {
    try{
        const {email} = req.params;
        const user = await User.findOneAndUpdate({email}, req.body, {new:true});
        if(!user) return res.status(404).json({message:'client non trouve'});
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel
    }
}

exports.checkDailyDueOut = async () => {
  try {
    // 1. Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });

    // 2. Obtenir la date d'aujourd'hui (minuit à minuit)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // 3. Trouver les réservations à mettre à jour
    const reservationsToUpdate = await Reservation.find({
      checkOutDate: {
        $gte: today,
        $lt: tomorrow
      },
      status: "Checked in"
    });

    // 4. Traitement des réservations
    const updateResults = await Promise.all(
      reservationsToUpdate.map(async (reservation) => {
        try {
          // Mise à jour de la réservation
          reservation.status = "Due out";
          await reservation.save();

    const user = await User.findOne({ email: reservation.email });

          // Envoi d'email au client
          const mailOptions = {
            from: `"${config.hotel.hotelName}" <${config.email.user}>`,
            to: reservation.email,
            subject: `Votre départ prévu aujourd'hui - ${config.hotel.hotelName}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                  .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                  .header { background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 30px; text-align: center; }
                  .content { padding: 30px; }
                  .info-box { background: #f8f9fa; border-left: 4px solid #3498db; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0; }
                  .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
                  .highlight { color: #e74c3c; font-weight: bold; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 28px;">Rappel de départ</h1>
                    <p style="margin: 10px 0 0; opacity: 0.8;">${config.hotel.hotelName}</p>
                  </div>
                  
                  <div class="content">
                    <p>Bonjour <span class="highlight">${user.fullName || 'Client'}</span>,</p>
                    
                    <p>Nous vous rappelons que votre départ de l'hôtel est prévu pour aujourd'hui.</p>
                    
                    <div class="info-box">
                      <h3 style="margin-top: 0; color: #2c3e50;">Détails de votre réservation</h3>
                      <p><strong>Chambre :</strong> ${reservation.roomNumber}</p>
                      <p><strong>Date de départ :</strong> ${new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}</p>
                      <p><strong>Heure limite de départ :</strong> 12h00</p>
                    </div>
                    
                    <p>Merci de libérer votre chambre avant l'heure indiquée.</p>
                    
                    <p>Nous espérons que vous avez passé un agréable séjour parmi nous.</p>
                    
                    <p>Pour toute question, n'hésitez pas à contacter la réception.</p>
                  </div>
                  
                  <div class="footer">
                    <p>L'équipe de ${config.hotel.hotelName}</p>
                    <p style="font-size: 12px; opacity: 0.8;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                  </div>
                </div>
              </body>
              </html>
            `
          };

          await transporter.sendMail(mailOptions);

          return {
            roomNumber: reservation.roomNumber,
            email: reservation.user.email,
            success: true,
            emailSent: true
          };

        } catch (error) {
          return {
            roomNumber: reservation.roomNumber,
            email: reservation.user?.email || 'inconnu',
            success: false,
            error: error.message,
            emailSent: false
          };
        }
      })
    );

    // 5. Rapport des résultats
    const successfulUpdates = updateResults.filter(r => r.success);
    const failedUpdates = updateResults.filter(r => !r.success);

    console.log(`Mise à jour quotidienne des checkouts:
      - Réservations trouvées: ${reservationsToUpdate.length}
      - Mises à jour réussies: ${successfulUpdates.length}
      - Échecs: ${failedUpdates.length}
      - Emails envoyés: ${successfulUpdates.length}`);

    return {
      totalReservations: reservationsToUpdate.length,
      successCount: successfulUpdates.length,
      failureCount: failedUpdates.length,
      emailsSent: successfulUpdates.length,
      failedUpdates
    };

  } catch (error) {
    console.error("Erreur dans checkDailyDueOut:", error);
    throw error;
  }
};


exports.sendCheckoutEmailAndDelete = async (req, res) => {
    try {
        const { email } = req.params;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Configuration du transporteur email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user,
                pass: config.email.password
            }
        });

        // 2. Trouver la réservation avec status "Due out"
        const reservation = await Reservation.findOne({ 
            email,
            status: "Due out"
        });

        if (!reservation) {
            return res.status(404).json({ 
                message: "Aucune réservation avec statut 'Due out' trouvée pour cet email" 
            });
        }

        // 3. Mettre à jour la chambre
        for (const roomNumber of reservation.roomNumber) {
         const room = await Room.findOneAndUpdate(
            { roomNumber: roomNumber },
            { status1: "Available" },
            { new: true }
        );

        const reservation = await Reservation.findOne({roomNumber});
        if (reservation) {
          reservation.status = "Checked out";
          await reservation.save();
        }
        
        if (!room) {
          return res.status(404).json({ 
            message: "Chambre non trouvée" 
          });
        }
        await room.save();
      }

      const user = await User.findOne({ email: reservation.email });

        // 4. Envoyer l'email avant suppression
        const mailOptions = {
            from: `"${config.hotel.hotelName}" <${config.email.user}>`,
            to: reservation.email,
            subject: `Confirmation de départ - ${config.hotel.hotelName}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
                        .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #2c3e50, #3498db); color: white; padding: 30px; text-align: center; }
                        .content { padding: 30px; }
                        .info-box { background: #f8f9fa; border-left: 4px solid #3498db; padding: 20px; margin: 25px 0; border-radius: 0 5px 5px 0; }
                        .footer { background: #2c3e50; color: white; padding: 20px; text-align: center; font-size: 14px; }
                        .highlight { color: #e74c3c; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">Merci pour votre séjour !</h1>
                            <p style="margin: 10px 0 0; opacity: 0.8;">${config.hotel.hotelName}</p>
                        </div>
                        
                        <div class="content">
                            <p>Bonjour <span class="highlight">${user?.fullName || 'Client'}</span>,</p>
                            
                            <p>Nous confirmons votre départ de notre hôtel.</p>
                            
                            <div class="info-box">
                                <h3 style="margin-top: 0; color: #2c3e50;">Détails de votre séjour</h3>
                                <p><strong>N° Réservation :</strong> ${reservation._id}</p>
                                <p><strong>Chambre :</strong> ${reservation.roomNumber}</p>
                                <p><strong>Arrivée :</strong> ${new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}</p>
                                <p><strong>Départ :</strong> ${new Date(reservation.checkOutDate).toLocaleDateString('fr-FR')}</p>
                            </div>
                            
                            <p>Nous espérons que vous avez passé un agréable séjour parmi nous.</p>
                            
                            <p>Pour votre prochain voyage, bénéficiez de <span class="highlight">10% de réduction</span> avec le code : <strong>REVIENS10</strong></p>
                        </div>
                        
                        <div class="footer">
                            <p>L'équipe de ${config.hotel.hotelName}</p>
                            <p style="font-size: 12px; opacity: 0.8;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptions);

        // 5. Supprimer la réservation et le guest
        //await User.deleteOne({email });

        return res.status(200).json({
            message: "Checkout confirmé, email envoyé et données supprimées",
            emailSent: true,
            userDeleted: true
        });

    } catch (error) {
        console.error("Erreur dans sendCheckoutEmailAndDelete:", error);
        return res.status(500).json({ 
            message: "Erreur lors du processus de checkout",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};  

exports.suppUser = async(req, res)=>{
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