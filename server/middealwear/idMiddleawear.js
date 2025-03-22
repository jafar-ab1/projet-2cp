import mongoose from 'mongoose';

export default function checkMongoDBId(paramName) {
  return (req, res, next) => {
    
    const paramValue = req.params[paramName];

 
    if (!mongoose.Types.ObjectId.isValid(paramValue)) {
      return res.status(400).json({
        success: false,
        message: `L'ID ${paramName} est invalide`,
        details: `La valeur fournie (${paramValue}) n'est pas un ID MongoDB valide.`,
      });
    }


    next();
  };
}