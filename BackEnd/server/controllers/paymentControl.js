const Payments = require('../models/Payments');


exports.getAll = async(req,res) => {
  try{
  const payment = await Payments.find();
      if (!payment) return res.status(404).json({ message: 'client non trouvé' });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
};

exports.getPayment = async (req, res) => {
    try {
      const { guestId } = req.params; 
      const payment = await Payments.findOne({ guestId });
      if (!payment) return res.status(404).json({ message: 'client non trouvé' });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

  exports.creatPayment = async (req, res) => {
    const {userId, amount, paymentDate, paymentMethod } = req.body;
    try {
      const newPayment = new Payments({userId, amount, paymentDate, paymentMethod });
      await newPayment.save();
      res.status(201).json(newPayment); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

