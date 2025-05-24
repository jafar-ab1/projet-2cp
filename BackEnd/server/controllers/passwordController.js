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
        <h3>Réinitialisation de mot de passe</h3>
        <p>Votre code de vérification : <strong>${resetCode}</strong></p>
        <p>Ce code expire dans 1 heure.</p>
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