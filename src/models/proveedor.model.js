const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
    nombre_empresa: {
        type: String,
        required: true,
        trim: true
    },
    nombre_persona: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    }, 
    dias_reparto: {
        type: [String],
        required: true,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;