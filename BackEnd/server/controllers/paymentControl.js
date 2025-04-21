const Payments = require('../models/Payments');
const User = require('../models/User');

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
      const { email } = req.params; 

      const user = await User.findOne({email});
      if(!user) return res.status(404).json({message: "user non trouvé"});

      const payment = await Payments.findOne({ email });
      if (!payment) return res.status(404).json({ message: 'client non trouvé' });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

  exports.creatPayment = async (req, res) => {
    const {email, amount, paymentDate, paymentMethod } = req.body;
    try {

      const user = await User.findOne({email});
      if(!user) return res.status(404).json({message: "user non trouvé"});

      const newPayment = new Payments({email, amount, paymentDate, paymentMethod });
      await newPayment.save();
      res.status(201).json(newPayment); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

