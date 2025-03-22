import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
    name: { type: String, enum: ["alger","anaba","oran"], required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
});
const Branch = mongoose.model('Branch', BranchSchema);
export default Branch;