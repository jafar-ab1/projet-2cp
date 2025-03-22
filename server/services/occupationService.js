export default class OccupationService{
    constructor(occupationModel){
        this.occupationModel = occupationModel;
    }

    async findAll(){
        return this.occupationModel.find();
    }

    async findByMonth(month){
        return this.occupationModel.findOne({month});
    }

    async create(createOccupationDto){
        const newOccupation = new this.occupationModel(createOccupationDto);
        return newOccupation.save();
    }

    async update(month, updateOccupationDto){
        return this.occupationModel.finOneAndUpdate({month}, updateOccupationDto, {new: true});
    }

    async delete(month){
        return this.occupationModel.findOneAndDelete({month})
    }
}
