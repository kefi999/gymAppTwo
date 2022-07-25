const mongoose = require("mongoose");

const mongooseSchema = new mongooseSchema({
  email: {
    type: String,
    required: true,
  },
  password: {},
});

module.exports = mongoose.model("gymOwner", mongooseSchema);
