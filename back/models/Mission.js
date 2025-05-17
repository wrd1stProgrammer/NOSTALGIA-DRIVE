const mongoose = require('mongoose');


const MissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receipt: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt' },
    stages: [
      {
        title: String,
        desc: String,
        expected_reduction_g : Number,
        completed: { type: Boolean, default: false },
      },
    ],
  }, { timestamps: true });
  module.exports = mongoose.model('Mission', MissionSchema);