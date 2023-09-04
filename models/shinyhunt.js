const mongoose = require("mongoose");

const shinyhuntSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: false},
    streak: { type: Number, default: 0},
    caught: { type: Number, default: 0}
});

module.exports = mongoose.model("shinyhunt", shinyhuntSchema);