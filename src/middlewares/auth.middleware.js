const Usuario = require('../models/usuario.model');
const {verificarToken} = require('../utils/token');

const isAuth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json("No autorizado");
        }
        const token = authorization.split(' ')[1];
        const {id } = verificarToken(token);
        const user = await Usuario.findById(id);
        if (!user){
            return res.status(401).json("Token o usuario no válido");
        }
        req.user = user;
        next();    
    } catch (error) {
        return res.status(401).json("Token no válido o sesión expirada");
    }}

    const esEncargado = (req, res, next) => {
        try {
            if (req.user &&req.user.role !== 'encargado') {
                return next();
            } else {
                return res.status(403).json("Acceso denegado. Solo los encargados pueden acceder a esta ruta.");
            }
        } catch (error) {
            return res.status(403).json("Error de permisos. Acceso denegado.");
        }}

    const esProveedor = (req, res, next) => {
        try {
            if (req.user && req.user.role !== 'proveedor') {
                return next();
            } else {
                return res.status(403).json("Acceso denegado. Solo los proveedores pueden acceder a esta ruta.");
            }
        } catch (error) {
            return res.status(403).json("Error de permisos. Acceso denegado.");
        }}

    const esEmpleado = (req, res, next) => {
        try {
            if (req.user && req.user.role !== 'empleado') {
                return next();
            } else {
                return res.status(403).json("Acceso denegado. Solo los empleados pueden acceder a esta ruta.");
            }
        } catch (error) {
            return res.status(403).json("Error de permisos. Acceso denegado.");
        }}

    module.exports = {isAuth, esEncargado, esProveedor, esEmpleado};