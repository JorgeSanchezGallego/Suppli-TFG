const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const {generarToken} = require('../utils/token');
const {borrarImagenCloudinary} = require('../utils/cloudinary.utils');

const registrarUsuario = async (req, res) => {
    try {
        const user = new Usuario(req.body);
        const userExistente = await Usuario.findOne({email: user.email});
        if (userExistente) {
            if (req.file) {
                await borrarImagenCloudinary(req.file.path);
            }
            return res.status(400).json({error: 'El usuario ya está registrado'});
        }
        if (req.file) {
            user.imagen = req.file.path;
        }

        const userGuardado = await user.save();
        userGuardado.contraseña = null;
        res.status(201).json(userGuardado);
    } catch (error) {
        if (req.file) {
            await borrarImagenCloudinary(req.file.path);
        }
        res.status(400).json({error: "error al registrar usuario", details: error.message});
    }
};

const loginUsuario = async (req, res) => {
    try {
        const {correo, contraseña} = req.body;
        const user = await Usuario.findOne({correo});
        if (!user) {
            return res.status(401).json({error: 'Usuario o contraseña incorrectos'});
        }
        const contraseñaValida = await bcrypt.compare(contraseña, user.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({error: 'Usuario o contraseña incorrectos'});
        }
        const token = generarToken(user._id, user.correo);
        user.contraseña = null;
        res.status(200).json({user, token});
    } catch (error) {
        res.status(400).json({error: "error al iniciar sesión", details: error.message});
    }
};

module.exports = {registrarUsuario, loginUsuario};