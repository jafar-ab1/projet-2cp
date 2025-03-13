const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
});

module.exports = mongoose.model("Branch", BranchSchema);
