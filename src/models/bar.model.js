const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    ubicacion: { 
        type: String, 
        required: true, 
        trim: true },
},

    { 
        timestamps: true,
        versionKey: false
    })


const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;