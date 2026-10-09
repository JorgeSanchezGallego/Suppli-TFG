const Pedido = require('../models/pedidos.models');
const Producto = require('../models/productos.models');

const crearPedido = async (req, res) => {
    try {
        const {productos} = req.body;
        if (!productos && productos.length === 0) {
            return res.status(400).json({error: "No se proporcionaron productos para el pedido"});
        }
        const productosConPrecio = await Promise.all(productos.map(async (item) => {
            const productoDB = await Producto.findById(item.producto);
            if (!productoDB) {
                throw new Error(`Producto con ID ${item.producto} no encontrado`);
            }
            return { producto: item.producto, cantidad: item.cantidad, precio: productoDB.precio };
        }));
        const nuevoPedido = new Pedido({
            usuario: req.user._id,
            productos: productosConPrecio,
        });
        const pedidoGuardado = await nuevoPedido.save();
        await pedidoGuardado.populate('productos.producto');
        res.status(201).json({ message: "Pedido realizado con éxito", pedido: pedidoGuardado });
    } catch (error) {
        res.status(500).json({error: "error al crear pedido", details: error.message});
    }
}

const verPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find({usuario: req.user._id}).populate('productos.producto').sort({creadoEn: -1});
        return res.status(200).json(pedidos);
    } catch (error) {
        return res.status(500).json({error: "error al obtener pedidos", details: error.message});
    }
};

module.exports = {crearPedido, verPedidos};