const Cleaning = require('../models/Cleaning');


exports.getAllCleaning = async (req,res) => {
    try{
        const cleanings = await Cleaning.find();
        res.status(200).json(cleanings);
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
}

exports.getCleaningByRoomNb = async(req, res) => {
    try{
        const {roomNumber} = req.params;

        if (!roomNumber) {
            return res.status(400).json({ message: 'roomNumber is required' });
        }

        const cleaning = await Cleaning.findOne({roomNumber});
        if(!cleaning) return res.status(404).json({Message:'cleanings  non trouvé'});
        res.status(200).json(cleaning);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.createCleaning = async(req, res) => {
    try{
        const {roomNumber, status, lastCleaned, nextCleaning} = req.body;
        const newCleaning = new Cleaning(req.body);
        await newCleaning.save();
        res.status(201).json(newCleaning);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.suppCleaning = async (req, res) => {
    try{
        const {roomNumber}= req.params;

        const cleaning = await Cleaning.findOne({roomNumber});
        if(!cleaning) return res.status(404).json({message: 'cleaning non trouvé'});
        
        await cleaning.deleteOne({roomNumber});
        res.status(200).json({message: 'cleaning supprime'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}