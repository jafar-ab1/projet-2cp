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
    try{
        const {userId, roomId}  =req.params;
        const feed_back = await Feed_back.findOne({userId, roomId}).populate('userId roomId');
        if(!feed_back) return res.status(404).json({Message:'feed back  non trouvé'});
        res.status(200).json(feed_back);
    }

    catch(error){
        res.status(500).json({message:'error page'});
    }
}

exports.getFeed_backCurrentMonth = async (req, res) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
          
        const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23, 59, 59
        );


        const feedbacks = await Feed_back.find({
            createdAt: {
                $gte: firstDayOfMonth,
                $lte: lastDayOfMonth
            }
        })
        .sort({ createdAt: -1 }) 
        .populate('userId', 'name email');

        res.status(200).json({
            period: {
                start: firstDayOfMonth,
                end: lastDayOfMonth,
                month: currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })
            },
            data: feedbacks,
            statistics: stats
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur serveur',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.creatFeed_back = async(req, res) => {
    try{
        const {comment, date, userId, roomId} = req.body;
        const newFeed = new Feed_back({comment, date, userId, roomId});
        await newFeed.save();
        res.status(201);
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}

exports.suppFeed_back = async (req, res) => {
    try{
        const {userId, roomId}  =req.params;
        const feedback = await Feed_back.findOneAndDelete({ userId, roomId }).populate('userId roomId');
        if(!feedback) return res.status(404).json({message: 'commentaire non trouvé'});
        await feedback.deleteOne({comment, date});
        res.status(200).json({message: 'feedback supprime'});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}