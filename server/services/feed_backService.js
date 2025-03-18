import feed_back from '../models/feed_back';

export class Feed_back{
    constructor(feed_backModel){
        this.feed_backModel = feed_backModel;
    }

    async getAll(){
        return this.feed_backModel.find();
    }

    async get(userId, roomId){
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

const feed_backService = new Feed_back(feed_back);
export default feed_backService;
