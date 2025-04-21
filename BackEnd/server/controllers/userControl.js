const User = require('../models/User');
const Reservation = require('../models/reservation')

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
        const { email } = req.params;
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

        const reservation = await Reservation.findOne({email});

        
        if (!reservation) {
            return res.status(404).json({ message: "Aucune réservation active trouvée" });
        }
        
        const checkOutDate = new Date(reservation.checkOutDate);
        checkOutDate.setHours(0,0,0,0);

        if (checkOutDate.getTime() !== today.getTime()) {
            return res.status(400).json({ 
                message: "Le check-out n'est pas prévu pour aujourd'hui",
                expectedCheckOut: reservation.checkOutDate,
                today: toDay
            });
        }


        reservation.status = "Checked out";
        await reservation.save();


        const mailOptions = {
            from: `"Service Client Hôtelier" <${config.email.user}>`,
            to: user.email,
            subject: 'Confirmation de départ',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #2c3e50;">Merci pour votre séjour !</h1>
                    
                    <p>Bonjour ${user.fullName},</p>
                    
                    <p>Votre départ de l'hôtel a bien été enregistré :</p>
                    
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Réservation :</strong> ${reservation._id}</p>
                        <p><strong>Chambre :</strong> ${reservation.roomNumber}</p>
                        <p><strong>Date d'arrivée :</strong> ${new Date(reservation.checkInDate).toLocaleDateString('fr-FR')}</p>
                        <p><strong>Date de départ :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
                    </div>
                    
                    <p>Nous espérons que votre séjour s'est bien passé.</p>
                    
                    <p>À bientôt pour votre prochain voyage !</p>
                    
                    </div>
                `
                 //   <div style="margin-top: 30px; font-size: 0.9em; color: #7f8c8d;">
                 //       <p>L'équipe de ${config.hotel.name}</p>
                 //       <p>${config.hotel.contact}</p>
                 //   </div>
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