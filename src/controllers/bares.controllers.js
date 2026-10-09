const Bar = require('../models/bar.model');
const Pedido = require('../models/pedido.model');
const Usuario = require('../models/usuario.model');

const verPedidosBar = async (req, res) => {
    try {
        const barId = req.params.id;
        const bar = await Bar.findById(barId);
        if (!bar) {
            return res.status(404).json({error: "Bar no encontrado"});
        }
        const pedidos = await Pedido.find({bar :barId}).populate('usuario').populate('productos.producto');
        if (!pedidos || pedidos.length === 0) {
            return res.status(404).json({error: "No hay pedidos asociados a este bar"});
        }
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(400).json({error: "error al obtener pedidos del bar", details: error.message});
    }
};

const verEmpleadosBar = async (req, res) => {
    try {
        const barId = req.params.id;
        const bar = await Bar.findById(barId);
        if (!bar) {
            return res.status(404).json({error: "Bar no encontrado"});
        }
        const empleados = await Usuario.find({bar: barId, role: {$in: ['empleado', 'encargado']}});
        if (!empleados || empleados.length === 0) {
            return res.status(404).json({error: "No hay empleados asociados a este bar"});
        }
        res.status(200).json(empleados);
    } catch (error) {
        res.status(400).json({error: "error al obtener empleados del bar", details: error.message});
    }
};

module.exports = {verPedidosBar, verEmpleadosBar};