const mongoose = require('mongoose');
const { nanoid } = require('nanoid');


const BranchSchema = new mongoose.Schema({
    id: {type: String ,default: () => nanoid(8)},
    name: { type: String, enum: ["alger","anaba","oran"], required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model('Branch', BranchSchema);