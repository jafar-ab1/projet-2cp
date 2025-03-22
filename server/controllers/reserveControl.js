import reservationService from "../services/reservationService.js";

export default class ReservationConrtoller{

    constructor(reservationService){
        this.reservationService= reservationService;
    }

    async getAll(req, res){
        try {
            const reservation = await this.reservationService.findAll();
            res.status(200).json(reservation);
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }

    async getById(req, res){
        try {
            const reservation = await this.reservationService.findById(req.params.id);
        
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
            const reservation = await this.reservationService.update(req.params.id, req.body);
            if (!reservation) return res.status(404).json({message:'reservation non trouvé'});
            res.status(200).json(reservation);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    };

    async delete(req, res){
        try{
            const reservation =await  this.reservationService.delete(req.params.id);
            if (!reservation) return res.status(404).json({message: 'reservation non trouvé'});
            res.status(200).json({message: 'reservation supprime'});
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    }
}
