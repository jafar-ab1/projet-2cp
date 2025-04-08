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

exports.creatUser = async(req, res) => {
    const {username, email, password} = req.body;
    try{
        const newUser = new User({username, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error)
    {
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