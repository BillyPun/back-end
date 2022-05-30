const mongoose = require('mongoose');

const staffSchema= new mongoose.Schema({
    username:{
		type: String,
		required: true
    },
    password:{
		type: String,
		required: true
    },
    signupcode:{
		type: String,
		required: true,
		match: /I am Staff/
    }
});

module.exports = mongoose.model("staffs",staffSchema);