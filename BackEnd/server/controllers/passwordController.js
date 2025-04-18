const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const config = require("../../config.js");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  // 1. Vérifier l'existence de l'utilisateur
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "Email non trouvé" });
  }


  // 2. Préparer le lien de réinitialisation
  const tokenSecret = `${config.jwt.keys.secret}-${user.password}`;
    const resetToken = jwt.sign(
      { userId: user._id },
      tokenSecret,
      { expiresIn: '1h' }
    );
  const resetLink = `${config.frontendUrl}/reset-password?token=${encodeURIComponent(resetToken)}&id=${user._id}`;
  console.log("Lien généré :", resetLink);
  
  
  // 3. Envoyer l'email
  try {
    const mailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.password
      },
      logger: true,
      debug: true,
      tls: {
        rejectUnauthorized: false // Seulement pour le développement
      }
    });

    await mailer.sendMail({
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
        <h3>Réinitialisation de mot de passe</h3>
        <p>Utilisez ce lien valable 1 heure :</p>
        <a href="${resetLink}">Changer mon mot de passe</a>
      `
    });

    return res.status(200).json({ message: "Lien envoyé par email" });
    
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return res.status(500).json({ message: "Erreur d'envoi d'email" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, id: userId, newPassword } = req.body;
    
    // 1. Récupérer l'utilisateur
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    // 2. Vérifier le token avec le secret + mot de passe actuel
    const tokenSecret = `${config.jwt.keys.secret}-${user.password}`;
    const decoded = jwt.verify(token, tokenSecret);

    // 3. Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis à jour" });
  } catch (error) {
    console.error("Erreur resetPassword:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: "Lien expiré" });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
};