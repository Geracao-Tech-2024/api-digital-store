require('dotenv').config();
const jwt = require('jsonwebtoken')

class JWToken {

    verifyJWT(req, resp, next) {
        let headers = req.headers.authorization;
        const token= headers.split(' ')[1]; 
        jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
            if (err) { return resp.status(401).end() };
    
            req.userId = decoded.userId;
            next()
        })
    }
    
    async createTokenJWT(id) {
        return await jwt.sign({ userId: id }, process.env.SECRET_JWT , { expiresIn: '1h' });
    }
}

module.exports = new JWToken();