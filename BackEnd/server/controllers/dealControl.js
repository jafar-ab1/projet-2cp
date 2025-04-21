const Deal = require('../models/Deal');


exports.getAllDeals = async (req,res) => {
    try{
        const deals = await Deal.find();
        res.status(200).json(deals);
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
}

exports.getDealByName = async(req, res) => {
    try{
        const dealName = req.params;

        const deal = await Deal.find({dealName});
        if(!deal) return res.status(404).json({Message:'deals  non trouvé'});
        res.status(200).json(deal);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.getDealByStatus = async(req, res) => {
    try{
        const status = req.params;

        if (!status) {
            return res.status(400).json({ message: 'status is required' });
        }

        const deal = await Deal.find({status});
        if(!deal) return res.status(404).json({Message:'deals  non trouvé'});
        res.status(200).json(deal);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.createDeal = async(req, res) => {
    try{
        const {dealName, reservationsLeft, endDate, roomType, status} = req.body; 
        const newDeal = new Deal({dealName, reservationsLeft, endDate, roomType, status});
        await newDeal.save();
        res.status(201).json(newDeal);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.deleteDeal = async (req, res) => {
    try{
        const {dealName}= req.params;
        const deal =await Deal.findOne({dealName});
        if(!deal) return res.status(404).json({message: 'deal non trouvé'});
        await deal.deleteOne({dealName});
        res.status(200).json({message: 'deal supprime'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}