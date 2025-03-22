import dealService from "../services/dealService.js";

export default class DealController{

    constructor(dealService){
        this.dealService = dealService;
    }

    async getAll(req, res){
        try{
            const deals = await this.dealService.findAll();
            res.status(200).json(deals);
         }
         catch(error){
            res.status(500).json({
                message: error.message
            });
         }
    };

    async getByName(req, res){
        try{
            const dealName = req.params.dealName;
    
            const deal = await this.dealService.findByName({dealName});
            if(!deal) return res.status(404).json({Message:'deals  non trouvé'});
            res.status(200).json(deal);
        }
        catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    };

    async create(req, res){
        const {dealName, reservationsLeft, endDate, roomType, status} = req.body;
    
    try{
        const newDeal = await this.dealService.create({dealName, reservationsLeft, endDate, roomType, status});
        res.status(201).json(newDeal);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
    };

    async delete(req, res){
        const {dealName} = req.params;
    
    try{
        const deal =await this.dealService.Delete({dealName});
        if(!deal) return res.status(404).json({message: 'commentaire non trouvé'});
        res.status(200).json({message: 'deal supprime'});
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
    };
}

