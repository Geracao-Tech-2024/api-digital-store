require('dotenv').config();
const jwt = require('jsonwebtoken')

class JWToken {
    #SECRET = process.env.SECRET_JWT;
    verifyJWT(req, resp, next) {
        const token = req.headers['athenticate'];
        jwt.verify(token, this.#SECRET, (err, decoded) => {
            if (err) { return resp.status(401).end() };
    
            req.userId = decoded.userId;
            next()
        })
    }
    
    createTokenJWT(id_user) {
        jwt.sign({ userId: id_user }, this.#SECRET, { expiresIn: '1h' })
    }
}

module.exports = new JWToken();