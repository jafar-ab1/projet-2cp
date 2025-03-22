export default class Feed_backService{
    constructor(feed_backModel){
        this.feed_backModel = feed_backModel;
    }

    async findAll(){
        return this.feed_backModel.find();
    }

    async find(userId, roomId){
        return this.feed_backModel.findOne({userId, roomId});
    }

    async create(createFeed_backDto){
        const newFeed = new this.feed_backModel(createFeed_backDto);
        return newFeed.save();
    }

    async delete(userId, roomId){
        return this.feed_backModel.findOneAndDelete({userId, roomId});
    }
}

