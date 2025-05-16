const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  userId: { type: String, required: true ,unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }, 
  userImage: { type: String },
  role: { type: String, enum: ['guardian', 'patient'], default: 'guardian' }, 
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],
  authStatus: { type: Number, default: 0 },
}, { timestamps: true }
);



UserSchema.methods.createAccessToken = function () {
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  };
  
  UserSchema.methods.createRefreshToken = function () {
    return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  };

const User = mongoose.model("User", UserSchema);
module.exports = User;
