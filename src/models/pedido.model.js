const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: true
    },
    bar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bar',
        required: true
    }, 
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }, 
    fecha_pedido: {
        type: Date,
        default: Date.now
    }, 
    estado: {
        type: String,
        enum: ['pendiente', 'enviado', 'entregado'],
        default: 'pendiente'
    }, 
    productos: [
    {
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto', // Nombre de tu modelo de producto
        required: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precioUnitario: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    cantidad: {
        type: Number,
        required: true,
        min: [1, 'La cantidad debe ser al menos 1']
    }
    }
],
    total: {
        type: Number,
        required: true,
        min: [0, 'El total no puede ser negativo']
    }},
    {
        timestamps: true,
        versionKey: false
    });

    pedidoSchema.pre('save', function () {
        if (!this.productos || this.productos.length === 0) {
            this.total = 0;
            return;
        }
        this.total = this.productos.reduce((acc, item) => acc + (item.precioUnitario * item.cantidad), 0);
        this.total = Math.round(this.total * 100) / 100;
    });

const Pedido = mongoose.model('Pedido', pedidoSchema);
module.exports = Pedido;