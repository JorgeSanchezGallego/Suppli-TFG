const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require('cloudinary').v2;

const conectarCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        console.log('Conexión a Cloudinary exitosa');
    } catch (error) {
        console.error('Error al conectar a Cloudinary:', error);
    }}

    module.exports = {conectarCloudinary};