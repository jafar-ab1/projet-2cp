import Deal from '../models/Deal';

export class DealService{

    constructor(dealModels){
        this.dealModels = dealModels;
    }

    async findAll(){
        return this.dealModels.find();
    }

    async finByName(dealName){
        return this.dealModels.findOne({dealName});
    }

    async create(createRoomDto){
        const newDeal =new this.dealModels(createRoomDto);
        return newDeal.save();
    }

    async delete(dealName){
        return this.dealModels.findOneAndDelete({dealName});
    }
}

const dealServices = new DealService(Deal);
export default dealServices;