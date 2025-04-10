const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:'client non trouvé'});
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel
    }
}

exports.modifyUser = async(req, res)=> {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!user) return res.status(404).json({message:'client non trouve'});
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel
    }
}

exports.suppUser = async(req, res)=>{
    try{
       const user = await User.findByIdAndDelete(req.params.id);
       if(!user) return res.status(404).json({message : 'client non trouve'});
       res.status(200).json({message : 'user supprimé'});
    }
    catch(error){
        res.status(500).json({ message: error.message }); // Renvoyer le message d'erreur réel

    }
}