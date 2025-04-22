const User = require('../models/User');
const Reservation = require('../models/reservation');
const Settings = require('../models/Settings');
const Room = require('../models/Room');

const nodemailer = require('nodemailer');
const config = require('../../config');


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

exports.sendCheckoutEmail = async (req, res) => {
    try {
        const { email, roomNumber } = req.params;
        const toDay =new Date();
        toDay.setHours(0,0,0,0);

        // 1. Configuration du transporteur
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user, 
                pass: config.email.password
            }
        });

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const reservation = await Reservation.findOne({email,roomNumber});
        if (!reservation) {
            return res.status(404).json({ message: "Aucune réservation active trouvée" });
        }

        
        const checkOutDate = new Date(reservation.checkOutDate);
        checkOutDate.setHours(0,0,0,0);
        
     //   if (toDay.getDate !== checkOutDate.getDate) return res.status(404).json({message:"c'est pas le jour de son checkOut"})

     const room = await Room.findOne({roomNumber});
        room.status1="Available";
        await room.save();
        
        reservation.status = "Checked out";
        await reservation.save();



        const mailOptions = {
            from: `"Service Client Hôtelier" <${config.email.user}>`,
            to: user.email,
            subject: 'Confirmation de départ - Merci pour votre séjour',
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
                  .button { display: inline-block; background: #e74c3c; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
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
                    <p>Bonjour <span class="highlight">${user.fullName}</span>,</p>
                    
                    <p>Votre départ de notre hôtel a bien été enregistré. Voici le récapitulatif :</p>
                    
                    <div class="info-box">
                     <h3 style="margin-top: 0; color: #2c3e50;">Détails de votre séjour</h3>
                      <p><strong>N° Réservation :</strong>${reservation._id}</p>
                      <p><strong>Chambre :</strong> ${reservation.roomNumber}</p>
                      <p><strong>Arrivée :</strong> ${reservation.checkInDate}</p>
                      <p><strong>Départ :</strong> ${reservation.checkOutDate}</p>
                      </div>
                    
                    <p>Nous espérons que vous avez passé un agréable séjour parmi nous.</p>
                    
                    <p>Pour votre prochain voyage, bénéficiez de <span class="highlight">10% de réduction</span> avec le code : <strong>REVIENS10</strong></p>
                    
                  
                 </div>
                  
                  <div class="footer">
                    <p>L'équipe de ${config.hotel.hotelName}</p
      
                  </div>
                </div>
              </body>
              </html>
            `
          };

        
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            reservation,
            message: "Email de check-out envoyé avec succès",
            checkOutTime: new Date() 
        });

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email de check-out:", error);
        res.status(500).json({ 
            message: "Erreur lors de la notification de départ",
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