const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    number: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    time: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = {
  UserModel,
};
