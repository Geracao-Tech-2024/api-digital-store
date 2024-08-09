require('dotenv').config();
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET_JWT;

function verifyJWT(req, resp, next) {
    const token = req.headers['athenticate'];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) { return resp.status(401).end() };

        req.userId = decoded.userId;
        next()
    })
}
function createTokenJWT() {
    jwt.sign({ userId: Myuser.id }, SECRET, { expiresIn: 300 })
}

module.exports = verifyJWT;