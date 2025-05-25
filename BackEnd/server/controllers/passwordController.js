const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require("../../config.js");
const Code = require('../models/VerificationCode.js');
const crypto = require('crypto');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email non trouvé" });
    }

    // 2. Générer un code de 6 chiffres
    const resetCode =  crypto.randomInt(100000, 999999).toString();
    const resetCodeExpires = new Date(Date.now() + 3600000); // 1 heure de validité

    // 3. Sauvegarder le code dans la base de données
    await Code.deleteMany({ email });

    const code = new Code({email: email, code:resetCode, expiresAt:resetCodeExpires})
    await code.save();

    // 4. Envoyer le code par email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });

    await transporter.sendMail({
      to: email,
      subject: "Code de réinitialisation de mot de passe",
      html: `
<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* Styles de base */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f7f7f7;
        }
        
        /* Conteneur principal */
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* En-tête */
        .email-header {
            background: linear-gradient(135deg, #4a6bff, #2541b2);
            padding: 30px 20px;
            text-align: center;
            color: white;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
        }
        
        /* Contenu */
        .email-content {
            padding: 30px;
        }
        
        h1 {
            color: #2541b2;
            margin-top: 0;
        }
        
        .code-container {
            background: #f8f9fa;
            border-left: 4px solid #4a6bff;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 5px 5px 0;
            text-align: center;
        }
        
        .verification-code {
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 3px;
            color: #2541b2;
            margin: 15px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: #4a6bff;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        
        /* Pied de page */
        .email-footer {
            background: #f1f3f5;
            color: #666666;
            padding: 20px;
            text-align: center;
            font-size: 12px;
        }
        
        .social-links {
            margin: 15px 0;
        }
        
        .social-icon {
            margin: 0 10px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .email-content {
                padding: 20px;
            }
            
            .verification-code {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://votre-logo.com/logo.png" alt="Logo" class="logo">
            <h1>Réinitialisation de mot de passe</h1>
        </div>
        
        <div class="email-content">
            <p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Voici votre code de vérification :</p>
            
            <div class="code-container">
                <p>Veuillez utiliser ce code :</p>
                <div class="verification-code">${resetCode}</div>
                <p>Ce code est valable pendant <strong>1 heure</strong>.</p>
            </div>
            
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email ou contacter notre support.</p>
            
            <p>Cordialement,<br>L'équipe de support</p>
        </div>
        
        <div class="email-footer">
            <p>© 2023 Votre Société. Tous droits réservés.</p>
            <div class="social-links">
                <a href="#" class="social-icon">Facebook</a>
                <a href="#" class="social-icon">Twitter</a>
                <a href="#" class="social-icon">Instagram</a>
            </div>
            <p>Si vous rencontrez des problèmes, contactez-nous à <a href="mailto:support@votresociete.com">support@votresociete.com</a></p>
        </div>
    </div>
</body>
</html>
      `
    });

    res.status(200).json({ 
      message: "Code envoyé par email",
      expiresAt: resetCodeExpires // Optionnel : pour afficher la durée de validité côté frontend
    });

  } catch (error) {
    console.error("Erreur forgotPassword:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // 1. Vérifier l'utilisateur et le code
    const codeVerif = await Code.findOne({ 
      email,
      code,
      expiresAt: { $gt: new Date() } // Vérifie que le code n'a pas expiré
    });

    if (!codeVerif) {
      return res.status(400).json({ 
        message: "Code invalide ou expiré" 
      });
    }

    const user =await User.findOne({email});

    // 2. Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour avec succès" });

  } catch (error) {
    console.error("Erreur resetPassword:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.verifyCode = async (req, res) => {
  try{
    const {email, code} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({message: "Utilisateur non trouvé"});

    const codeVerif = await Code.findOne({email, code})
    if (!codeVerif) return res.status(404).json({message: "code nontrouvé"});
  

    res.status(200).json({message: "code bien reçu"})
  } catch(error) {
    console.error("Erreur verifyCode:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}