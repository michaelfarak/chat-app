const mongoose = require("mongoose");

// TODO: update User model to accept array of rooms he joined
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  color: {
    type: String,
    unique: false,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
