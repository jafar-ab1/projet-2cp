import Payments from "../models/Payments";

export class PaymentService{
    constructor(paymentModel){
        this.paymentModel = paymentModel;
    }

    async findAll(){
        return this.paymentModel.find();
    }

    async findByGuestId(guestId){
        return this.paymentModel.findOne({guestId});
    }

    async create(createPaymentDto){
        const newPayment = new this.newPayment(createPaymentDto);
        return newPayment.save();
    }
}

const paymentService = new PaymentService(Payments);
export default paymentService;