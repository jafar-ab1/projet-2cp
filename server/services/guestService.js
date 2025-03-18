import guest from '../models/Guest';

export class GuestService{
    constructor(guestModel){
        this.guestModel = guestModel;
    }

    async findAll(){
        return this.guestModel.find();
    }

    async findById(id){
        return this.guestModel.findById(id);
    }

    async create(createGuestDto){
        const newGuest = new this.guestModel(createGuestDto);
        return newGuest.save();
    }

    async update(id, updateGuestDto){
        return this.guestModel.findByIdAndUpdate(id, updateGuestDto, {new: true})
    }

    async delete(id){
        return this.guestModel.findByIdAndDelete(id)
    }
}

const guestService = new GuestService(guest);
export default guestService;
