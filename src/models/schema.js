var mongoose = require('../models/mongoose'); 


var smsNumbersSchema = mongoose.Schema({
    smsnumber: { type: String },
    usageCount: { type: Number, default: 0 },
    availability:Boolean,
    purpose:{ type: String }
});

var smsnumbers = mongoose.model('smsnumbers', smsNumbersSchema);
exports.smsnumbers = smsnumbers;
