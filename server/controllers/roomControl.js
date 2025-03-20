export class roomConroller{

    constructor(roomService){
        this.roomService = roomService;
    }

    async getAll(req, res){
        try {
            const rooms = await this.roomService.find();
            res.status(200).json(rooms);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }

    async getRoomById(req ,res){
        try{
            const room = await this.roomService.findById(req.params.is);
            res.status(200).json(room);
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
    };


    async getByroomStatus(req, res){}

    async getByroomType(req, res){
        const {type} = req.params;
    try {
        const rooms = await this.roomService.find({type});
        res.status(200).json(rooms);
    }
    catch(error){
        res.status(500).json({message: error.message}); 
    }
    };

    async create(req, res){
        const {roomNumber, type, status, price, floor} = req.body;
    try{
        const newRoom= await this.roomService.create({roomNumber, type, status, price, floor});
        res.status(201).json(newRoom);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
    async update(req, res){
        try{
            const room = await this.roomService.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if (!room) return res.status(404).json({message:'chambre non trouvé'});
            res.status(200).json(room);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    };

    async delete(req, res){
        try{
            const room = await this.roomService.findByIdAndDelete(req.params.id);
            if (!room) return res.status(404).json({message: 'chambre non trouvé'});
            res.status(200).json({message: 'room supprimer'});
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    }

}
