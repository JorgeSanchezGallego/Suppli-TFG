const Producto = require('../models/productos.models');
const {borrarImagenCloudinary} = require('../utils/cloudinary.utils');

const verProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({error: "error al obtener productos", details: error.message});
    }
};

const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        if (req.file) {
            nuevoProducto.imagen = req.file.path;
        } else {
            return res.status(400).json({error: "Se requiere una imagen para el producto"});
        }
        const productoGuardado = await nuevoProducto.save();
        res.status(201).json({ message: "Producto creado con éxito", producto: productoGuardado });
    } catch (error) {
        if (req.file && req.file.path) {
            await borrarImagenCloudinary(req.file.path);
        }
        if (error.code === 11000) {
            return res.status(409).json({error: "El producto ya existe"});
        }
        res.status(400).json({error: "error al crear producto", details: error.message});
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const productoExistente = await Producto.findById(id);
        if (!productoExistente) {
            return res.status(404).json({error: "Producto no encontrado"});
        }
        const actualizacion = {...req.body,};
        if (req.file) {
            actualizacion.imagen = req.file.path;
            borrarImagenCloudinary(productoExistente.imagen);
        }
        const productoActualizado = await Producto.findByIdAndUpdate(id, actualizacion, {runValidators: true});
        res.status(200).json(productoActualizado);
    } catch (error) {
        res.status(400).json({error: "error al actualizar producto", details: error.message});
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const {id} = req.params;
        const productoABorrar = await Producto.findByIdAndDelete(id);
        if (!productoABorrar) {
            return res.status(404).json({error: "Producto no encontrado"});
        }
        borrarImagenCloudinary(productoABorrar.imagen);
        res.status(200).json({message: "Producto eliminado con éxito", producto: productoABorrar});
    } catch (error) {
        res.status(400).json({error: "error al eliminar producto", details: error.message});
    }
};

const buscarProductoPorNombre = async (req, res) => {
    try {
        const {nombre} = req.params;
        if (!nombre) {
            return res.status(400).json({error: "Se requiere un nombre para buscar"});
        }
        const productos = await Producto.find({nombre: new RegExp(nombre, 'i')});
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({error: "error al buscar producto", details: error.message});
    }
};

const buscarProductoPorCategoria = async (req, res) => {
    try {
        const {categoria} = req.params;
        if (!categoria) {
            return res.status(400).json({error: "Se requiere una categoría para buscar"});
        }
        const productos = await Producto.find({categoria: new RegExp(categoria, 'i')});
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({error: "error al buscar producto", details: error.message});
    }
};

const buscarProductoPorProveedor = async (req, res) => {
    try {
        const {proveedor} = req.params;
        if (!proveedor) {
            return res.status(400).json({error: "Se requiere un proveedor para buscar"});
        }
        const productos = await Producto.find({proveedor: new RegExp(proveedor, 'i')});
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({error: "error al buscar producto", details: error.message});
    }
};

module.exports = {
    verProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    buscarProductoPorNombre,
    buscarProductoPorCategoria,
    buscarProductoPorProveedor
};
