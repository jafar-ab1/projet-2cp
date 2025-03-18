import maintenance from '../models/Maintenance';

export class MaintenanceService{
    constructor(maintenanceModel){
        this.maintenanceModel = maintenanceModel;
    }

    async findAll(){
        return this.maintenanceModel.find();
    }

    async findByroomNb(roomNumber){
        return this.maintenanceModel.findOne(roomNumber);
    }

    async create(createmaintenanceDto){
        const newmaintenance = new this.maintenanceModel(createmaintenanceDto);
        return newmaintenance.save();
    }

    async update(roomNumber, updatemaintenanceDto){
        return this.maintenanceModel.findOneAndUpdate({roomNumber}, updatemaintenanceDto, {new: true})
    }

    async delete(roomNumber){
        return this.maintenanceModel.findOneAndDelete({roomNumber})
    }
}

const maintenanceService = new MaintenanceService(maintenance);
export default maintenanceService;
