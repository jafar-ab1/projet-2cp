export class reservationConrtoller{

    constructor(reservationService){
        this.reservationService= reservationService;
    }

    async getAll(req, res){
        try {
            const reservation = await this.reservationService.find();
            res.status(200).json(reservation);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }

    async getById(req, res){
        try {
            const reservation = await this.reservationService.findById(req.params.id).populate('guestId roomId');
        
            if (!reservation) return res.status(404).json({ message: 'reservation non trouvé'});
            res.status(200).json(reservation);
            }
            catch(error){
                res.status(500).json({ message: error.message });
            }
    };

    async create(req, res){
        const {checkInDate, checkOutDate, totalPrice, status} = req.body;
    try{
        const newReservation= await this.reservationService.create({checkInDate, checkOutDate, totalPrice, status});
        res.status(201).json(newReservation);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
    };

    async update(req, res){
        try{
            const reservation = await this.reservationService.findByIdAndUpdate(req.params.id, req.body, {new:true});
            if (!reservation) return res.status(404).json({message:'reservation non trouvé'});
            res.status(200).json(reservation);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    };

    async delete(req, res){
        try{
            const reservation =await  this.reservationService.findByIdAndDelete(req.params.id);
            if (!reservation) return res.status(404).json({message: 'reservation non trouvé'});
            res.status(200).json({message: 'reservation supprime'});
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    }
}
