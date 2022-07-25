const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: [false, "Plase enter name"] },
    email: {
      type: String,
      required: [false, "Plase enter email"],
      unique: true,
    },
    phonenumber: {
      type: Number,
      required: [true, "Please enter phone number"],
    },
    password: { type: String, required: [true, "Plase enter password"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
