const cloudinary = require('cloudinary').v2;

const borrarImagenCloudinary = (url) => {
    const array = url.split('/');
    const nombre = array.at(-1).split('.')[0];
    
    let public_id = `${array.at(-2)}/${nombre}`;
    cloudinary.uploader.destroy(public_id, () => {
        console.log("Imagen eliminada de Cloudinary");
    });
};

module.exports = {borrarImagenCloudinary};