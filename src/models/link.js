const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
