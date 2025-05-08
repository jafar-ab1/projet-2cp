const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const config = require("../../config.js");
const User = require("../models/User.js");


module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
    console.log('[DEBUG] Token reçu:', token);

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.keys.secret, {
      algorithms: ['HS256'] // Force l'algorithme
    });
    console.log('[DEBUG] Token décodé:', decoded);

    const user = await User.findById(decoded.id);
    if (!user) throw new Error('Utilisateur introuvable');

    req.user = user;
    next();
  } catch (error) {
    console.error('[ERREUR] JWT Error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(401).json({ 
      error: 'Token invalide',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
};