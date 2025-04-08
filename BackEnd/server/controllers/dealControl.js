const Deal = require('../models/Deal');

exports.getAllDeals = async (req,res) => {
    try{
        const deals = await Deal.find();
        res.satuts(200).json(deals);
     }
     catch(error){
        res.status(500).json({message: error.message});
     }
}

exports.getDealByName = async(req, res) => {
    try{
        const dealName = req.params.dealName;

        if (!dealName) {
            return res.status(400).json({ message: 'dealName is required' });
        }

        const deal = await Deal.find({dealName});
        if(!deal) return res.status(404).json({Message:'deals  non trouvé'});
        res.status(200).json(deal);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.createDeal = async(req, res) => {
    const {dealName, reservationsLeft, endDate, roomType, status} = req.body;
    
    if (!dealName || !reservationsLeft || !endDate || !roomType || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const newDeal = new Deal({dealName, reservationsLeft, endDate, roomType, status});
        await newDeal.save();
        res.status(201).json(newDeal);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

exports.suppFeed_back = async (req, res) => {
    const {dealName, reservationsLeft, endDate, roomType, status} = req.params;
    if (!dealName || !reservationsLeft || !endDate || !roomType || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try{
        const deal = Deal.findOne({dealName, reservationsLeft, endDate, roomType, status});
        if(!deal) return res.status(404).json({message: 'commentaire non trouvé'});
        await deal.deleteOne();
        res.status(200).json({message: 'deal supprime'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}