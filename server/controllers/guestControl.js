import guestService from "../services/guestService.js";

export default class GuestController{

    constructor(guestService){
        this.guestService = guestService;
    }

    async getAll(req, res){
        try {
            const guests = await this.guestService.findAll();
            res.status(200).json(guests);
          } catch (error) {
            res.status(500).json({ 
                message: error.message 
            });
          }
    };

    async getById(req, res){
        try{
            const guest = await this.guestService.findById(req.params.id);
            if(!guest) return res.status(404).json({message:'client non trouvé'});
            res.status(200).json(guest);
        }
        catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    };

    async create(req, res){
        const {guestname, roomnumber,checkInDate, checkOutDate, feedback} = req.body;
        try{
            const newGuest = await this.guestService.create({ guestname, roomnumber, checkInDate, checkOutDate, feedback });
            res.status(201).json(newGuest);
        }
        catch(error)
        {
            res.status(500).json({
                message:error.message
            });
        }
    };

    async update(req, res){
        try{
            const guest = await this.guestService.update(req.params.id, req.body);
            if(!guest) return res.status(404).json({message:'client non trouve'});
            res.status(200).json(guest);
        }
        catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    };

    async delete(req, res){
        try{
            const guest = await this.guestService.delete(req.params.id);
            if(!guest) return res.status(404).json({message : 'client non trouve'});
            res.status(200).json({message : 'guest supprimé'});
         }
         catch(error){
             res.status(500).json({
                message: error.message
            });
     
         }
    };

}