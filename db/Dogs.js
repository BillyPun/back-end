const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
  dog_name: {
    type: String,
    required: true
  },
  dog_type: {
    type: String,
    required: true
  },
  dog_age: {
    type: String,
    required: true
  },
  dog_detail: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("dogs", dogSchema);