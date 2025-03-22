export default class FloorService{
    constructor(floorModel){
        this.floorModel = floorModel;
    }

    async findAll(){
        return this.floorModel.find();
    }

    async findByfloorNb(floorNb){
        return this.floorModel.findOne({floorNb});
    }

    async create(createFloorDto){
        const newFloor = new this.floorModel(createFloorDto);
        return newFloor.save();
    }

    async update(floorNb, updateFloorDto){
        return this.floorModel.findOneAndUpdate({floorNb}, updateFloorDto, { new: true });
    }

    async delete(floorNb){
        return this.floorModel.findOneAndDelete({floorNb});
    }
}
