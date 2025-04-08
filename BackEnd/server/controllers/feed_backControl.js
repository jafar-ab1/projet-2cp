const Feed_back = require('../models/feed_back');

exports.getAllFeed_backs = async (req, res) => {
    try {
      const feed_back = await Feed_back.find();
      res.status(200).json(feed_back);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.getFeed_back = async(req, res) => {
    const {userId, roomId} = req.params;
    if (!userId || !roomId) {
        return res.status(400).json({ message: 'userId and roomId are required' });
    }
    try{
        const feed_back = await Feed_back.findOne({userId, roomId}).populate('userId roomId');
        if(!feed_back) return res.status(404).json({Message:'feed back  non trouvé'});
        res.status(200).json(feed_back);
    }

    catch(error){
        res.status(500).json({message:'error page'});
    }
}

exports.creatFeed_back = async(req, res) => {
    const {comment, date} = req.body;
    try{
        const newFeed = new Feed_back({comment, date});
        await newFeed.save();
        res.status(201);
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}

exports.suppFeed_back = async (req, res) => {
    const {userId, roomId} = req.params;
    if (!userId || !roomId) {
        return res.status(400).json({ message: 'userId and roomId are required' });
    }
    try{
        const feedback = Feed_back.findOne({userId, roomId}).populate('userId roomId');
        if(!feedback) return res.status(404).json({message: 'commentaire non trouvé'});
        await feedback.deleteOne({comment, date});
        res.status(200).json({message: 'feedback supprime'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}