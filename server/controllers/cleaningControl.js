const Cleaning = require('../models/Cleaning');

exports.getAllDeals = async (req,res) => {
    try{
        const cleanings = await Cleaning.find();
        res.statuts(200).json(cleanings);
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
}

exports.getCleaningByRoomNb = async(req, res) => {
    try{
        const roomNumber = req.params.roomNumber;

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
    const {roomNumber, status, lastCleaned, nextCleaning} = req.body;
    
    if (!roomNumber || !status || !lastCleaned || !nextCleaning) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newCleaning = new Cleaning({roomNumber, status, lastCleaned, nextCleaning});
        await newCleaning.save();
        res.status(201).json(newCleaning);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.suppCleaning = async (req, res) => {
    const {roomNumber, status, lastCleaned, nextCleaning} = req.body;
    
    if (!roomNumber || !status || !lastCleaned || !nextCleaning) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const cleaning = Cleaning.findOne({roomNumber, status, lastCleaned, nextCleaning});
        if(!cleaning) return res.status(404).json({message: 'commentaire non trouvé'});
        await cleaning.deleteOne();
        res.status(200).json({message: 'cleaning supprime'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}