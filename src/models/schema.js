var mongoose = require('../models/mongoose'); 


var car = mongoose.Schema({
    //{engine:ON/OFF,lamp:ON/OFF,speed:range,accessories:{wifi:ON/OFF,bt:ON/OFF,media:ON/OFF}}
    engine: { type: Boolean },
    simid: { type: String },
    lamp:{ type: Boolean },
    handbrake:{ type: Boolean },
    speed :{ type: String },
    accessories:{wifi:{ type: Boolean },bt:{ type: Boolean },media:{ type: Boolean },ac:{ type: Boolean }},
    indicator:{left:{ type: Boolean },right:{ type: Boolean }}
});

var car = mongoose.model('car', car);
exports.car = car;
