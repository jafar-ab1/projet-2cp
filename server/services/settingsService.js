import settings from '../models/Settings';

export class SettingsService{
    constructor(settingsModels){
        this.settingsModels = settingsModels;
    }

    async find(){
        return this.settingsModels.findOne();
    }

    async update(updateSettingsDto){
        return this.settingsModels.findOneAndUpdate({},updateSettingsDto, {new: true});
    }
}

const settingsService = new SettingsService(settings);
export default settingsService;