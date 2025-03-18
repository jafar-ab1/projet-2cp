import tarif from '../models/Tarif';

export class TarifService{
    constructor(tarifModel){
        this.tarifModel = tarifModel;
    }

    async findAll(){
        return this.tarifModel.find();
    }

    async find(roomType, price){
        return this.tarifModel.findOne({roomType, price});
    }

    async create(createTarifDto){
        const newTarif = new this.tarifModel(createTarifDto);
        return newTarif.save();
    }

    async update(roomType, price,updateTarifDto){
        return this.tarifModel.findOneAndUpdate({roomType, price}, updateTarifDto, {new : true});
    }

    async delete(roomType, price){
        return this.tarifModel.findOneAndDelete({roomType, price});
    }
}

const tarifService = new TarifService(tarif);
export default tarifService;