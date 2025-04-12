const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require("../../config.js")

// Inscription
exports.register = async (req, res) => {
  try {
    const {username, email, password, userRole, telephone } = req.body;
    // Vérifier si l'utilisateur existe déjà
    const userExistName = await User.findOne({username});
    if(userExistName) return res.status(401).json({message:'ce user name est deja utilisé '});

    const userExistEmail = await User.findOne({ email });
    if (userExistEmail) {
      return res.status(401).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const user = new User({username, email, password, userRole, telephone });
    await user.save();

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, config.jwt.keys.secret, {
      expiresIn: '1h',
    });

    res.status(201).json({ token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.userRole
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
    const token = jwt.sign({ userId: user._id }, config.jwt.keys.secret, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error });
  }
};