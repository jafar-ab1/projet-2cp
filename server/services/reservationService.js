export default class ReservationService{
    constructor(reservationModels){
        this.reservationModels = reservationModels;
    }

    async findAll(){
        return this.reservationModels.find();
    }

    async findById(id){
        return this.reservationModels.findById(id).populate('guestId roomId');
    }

    async create(createResercationDto){
        const newReservation = new this.reservationModels(createResercationDto);
        return newReservation.save();
    }

    async update(id, createResercationDto){
        return this.reservationModels.findByIdAndUpdate(id, createResercationDto, {new:true}).populate('guestId roomId');
    }

    async delete(id){
        return this.reservationModels.findByIdAndDelete(id).populate('guestId roomId');
    }
}
