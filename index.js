const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const { connectDB } = require('./src/config/db');


app.use(express.json());
app.use(cors());

connectDB();

app.use((req, res, next) => {
    return res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});