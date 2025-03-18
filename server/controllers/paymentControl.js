export class paymentController{

  constructor(paymentService){
    this.paymentService= paymentService;
  }

  async getAll(req, res){
    try {
      const { guestId } = req.params; 
      const payment = await this.paymentService.findOne({ guestId });
      if (!payment) return res.status(404).json({ message: 'client non trouvé' });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

  async getByGuestId(req, res) {
    try {
      const { guestId } = req.params;
      const payment = await this.paymentService.findOne({ guestId });
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res){
    const { reservation, amount, paymentDate, paymentMethod } = req.body;
    try {
      const newPayment = await this.paymentService.create({ reservation, amount, paymentDate, paymentMethod });
      res.status(201).json(newPayment); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }
}
