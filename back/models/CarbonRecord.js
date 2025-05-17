const mongoose = require('mongoose');

const CarbonRecordSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },          // 하루 단위 기준
    amount: { type: Number, required: true },      // + = 절감, – = 증가 (단위: gCO2)
    desc: { type: String },
    category: { type: String },                    // 식품·교통 등 (선택)
  },
  { timestamps: true }
);

module.exports = mongoose.model('CarbonRecord', CarbonRecordSchema);
