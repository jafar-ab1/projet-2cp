const Payments = require('../models/Payments');

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
    const { reservation, amount, paymentDate, paymentMethod } = req.body;
    try {
      const newPayment = new Payments({ reservation, amount, paymentDate, paymentMethod });
      await newPayment.save();
      res.status(201).json(newPayment); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  };

