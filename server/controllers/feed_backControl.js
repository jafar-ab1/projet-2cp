export class feed_backController{

    constructor(feed_backService){
        this.feed_backService= feed_backService;
    }

    async getAllFeed_backs(req, res){
        try {
          const feed_back = await this.feed_backService.find();
          res.status(200).json(feed_back);
        } catch (error) {
          res.status(500).json({ 
            message: error.message
         });
        }
      };

    async get(req, res){
        const {userId, roomId} = req.params;
        
        try{
            const feed_back = await this.feed_backService.findOne({userId, roomId}).populate('userId roomId');
            if(!feed_back) return res.status(404).json({Message:'feed back  non trouvé'});
            res.status(200).json(feed_back);
        }
    
        catch(error){
            res.status(500).json({
                message:error.message
            });
        }
    };

    async create(req, res){
        const {comment, date} = req.body;
    try{
        const newFeed = await this.feed_backService.create({comment, date});
        res.status(201).json(newFeed);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
    };

    async delete(req, res){
        const {userId, roomId} = req.params;
       
        try{
            const feedback =await this.feed_backService.findOneAndDelete({userId, roomId});
            if(!feedback) return res.status(404).json({message: 'commentaire non trouvé'});
            res.status(200).json({message: 'feedback supprime'});
        }
        catch(error){
            res.status(500).json({
                message: error.message
            });
        }
    }
}

