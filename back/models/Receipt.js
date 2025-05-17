const mongoose = require('mongoose');


const ReceiptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: String,
    ocrJson: {},          // Gemini vision raw
    totalCarbon: Number,  // gCO2
  }, { timestamps: true });
  module.exports = mongoose.model('Receipt', ReceiptSchema);