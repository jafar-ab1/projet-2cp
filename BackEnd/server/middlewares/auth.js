const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../config');

exports.protect = async (req, res, next) => {
  try {
    // Debug 1: Vérifiez l'entrée
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Format Authorization: Bearer <token> requis');
    }

    const token = authHeader.split(' ')[1].trim();

    // Debug : Vérifiez manuellement
    const decoded = jwt.verify(token, config.jwt.keys.secret, { algorithms: ['HS256'] });
    
    const user = await User.findById(decoded.id).select('-password'); // Exclut le mot de passe

    if (!user) throw new Error('Utilisateur introuvable');
    
    req.user = user; // <-- ESSENTIEL

    next();
  } catch (error) {
    console.error("Erreur JWT complète:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      token: error.token || req.headers.authorization?.split(' ')[1]
    });
    
    res.status(401).json({
      error: "Échec d'authentification",
      details: {
        type: error.name,
        reason: error.message,
        expectedAlgorithm: 'HS256',
        secretLength: config.jwt.keys.secret?.length
      }
    });
  }
};