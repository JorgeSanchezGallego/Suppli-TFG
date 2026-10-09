const jwt = require('jsonwebtoken');

const generarToken = (id, email) => {
    return jwt.sign(
        {id, email},
        proccess.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
}

const verificarToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {generarToken, verificarToken};