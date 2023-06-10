const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Todo",
    }
  ],
});

module.exports = mongoose.model("User", userSchema);