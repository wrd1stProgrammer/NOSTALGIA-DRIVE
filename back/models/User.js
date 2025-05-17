const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    userImage: String,
    role: { type: String, enum: ["guardian", "patient"], default: "guardian" },

    /* 추가: 한 달 누적 절감량(캐싱용) */
    monthlyCarbonStat: {
      month: String,           // '2024-05'
      totalPlus: { type: Number, default: 0 },  // gCO2
      totalMinus: { type: Number, default: 0 }, // gCO2
    },
  },
  { timestamps: true }
);

// 토큰 util 그대로
UserSchema.methods.createAccessToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
UserSchema.methods.createRefreshToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

module.exports = mongoose.model("User", UserSchema);
