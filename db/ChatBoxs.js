const mongoose = require('mongoose');

const chatBoxSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true
    },
    dog_name: {
        type: String,
        required: true
    }, 
    user_message: {
        type: String,
    },
    staff_respond:{
        type: String,
    }
});

module.exports = mongoose.model("chatboxs", chatBoxSchema);