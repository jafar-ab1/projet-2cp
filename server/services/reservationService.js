import reservation from '../models/reservation';

export class ReservationService{
    constructor(reservationModels){
        this.reservationModels = reservationModels;
    }

    async findAll(){
        return this.reservationModels.find();
    }

    async findById(id){
        return this.reservationModels.findById(id);
    }

    async create(createResercationDto){
        const newReservation = new this.reservationModels(createResercationDto);
        return newReservation.save();
    }

    async update(id, createResercationDto){
        return this.reservationModels.findByIdAndUpdate(id, createResercationDto, {new:true});
    }

    async delete(id){
        return this.reservationModels.findByIdAndDelete(id);
    }
}

const reservationService = new ReservationService(reservation);
export default reservationService;