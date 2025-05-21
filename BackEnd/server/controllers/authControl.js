const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require("../../config.js");
const VerificationCode = require('../models/VerificationCode');
const { sendVerificationEmail } = require('../services/emailService');

// Inscription
exports.register = async (req, res) => {
  try {
    const {fullName, email, password, mobileNumber} = req.body;
    
    // Vérifier si l'utilisateur existe déjà
    const found = await User.findOne({email});
    if(found) return res.status(401).json({message:`Email ${email} already exists`});

    // Créer un nouvel utilisateur
    const user = new User({fullName, email, password, mobileNumber});
    await user.save();

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id }, // Payload minimal
      config.jwt.keys.secret, // Clé doit être identique partout
      { 
        algorithm: 'HS256', // Spécifiez explicitement
        expiresIn: '1h' // Testez avec durée courte d'abord
      }
    );
    console.log('Nouveau token généré:', token);

    res.status(201).json({ token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
     });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription.', error });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const iscorrect = await user.comparePassword(password);
    if (!iscorrect) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id }, // Payload minimal
      config.jwt.keys.secret, // Clé doit être identique partout
      { 
        algorithm: 'HS256', // Spécifiez explicitement
        expiresIn: '1h' // Testez avec durée courte d'abord
      }
    );
    console.log('Nouveau token généré:', token);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error });
  }
};


exports.sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Générer un code PIN aléatoire de 6 chiffres
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Définir l’expiration (10 minutes)
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // Sauvegarder dans la base (supprime l'ancien code s'il existe)
        await VerificationCode.findOneAndUpdate(
            { email },
            { code, expiresAt },
            { upsert: true, new: true }
        );

        // Envoyer l’email
        await sendVerificationEmail(email, code);

        res.status(200).json({ message: "Verification code sent successfully." });

    } catch (error) {
        console.error("Error sending verification code:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Verfication du code de confirmation
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Chercher le code dans la base
    const verification = await VerificationCode.findOne({ email });
    if (!verification) {
      return res.status(400).json({ message: "Aucun code de vérification trouvé." });
    }

    // Vérifier si le code est correct
    if (verification.code !== code) {
      return res.status(400).json({ message: "Code invalide." });
    }

    // Vérifier si le code n'est pas expiré
    if (verification.expiresAt < new Date()) {
      return res.status(400).json({ message: "Code expiré." });
    }

    // Mettre à jour l'utilisateur pour le marquer comme vérifié
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    // Supprimer le code de vérification de la base
    await VerificationCode.deleteOne({ email });

    res.status(200).json({
      message: "Email vérifié avec succès !",
      user
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
