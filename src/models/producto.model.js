const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    medida: {
        type: String,
        required: true,
        trim: true
    },
    stock_optimo_invierno: {
        type: Number,
        required: true,
        trim: true
    },
    stock_optimo_verano: {
        type: Number,
        required: true,
        trim: true
},
    categoria: {
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;