const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            family: 4,
        });
        console.log("Conectado con éxito a la BBDD 🟢");
    } catch (error) {
        console.error("Error al conectar con la BBDD 🔴", error);
    }
};

module.exports = { connectDB }; 