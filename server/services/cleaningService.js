export default class CleaningService{

    constructor(cleaningModel){
        this.cleaningModel = cleaningModel;
    }

    async findAll(){
        return this.cleaningModel.find()
    }

    async findByRoomNb(roomNumber){
        return this.cleaningModel.findOne({roomNumber});
    }

    async create(createCleaningDto){
        const newCleaning = new this.cleaningModel(createCleaningDto);
        return newCleaning.save()
    }

    async delete(roomNumber){
        return this.cleaningModel.findOneAndDelete({roomNumber});
    }
};
