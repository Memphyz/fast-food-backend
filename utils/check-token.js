const jwt = require("jsonwebtoken");
const HTTPS = require("./responses");


const auth = (requisition, response, next) => {
     const header = requisition.headers.authorization;
     const token = header && header.split(' ')[1];
     if (!token) {
          return response.status(HTTPS.UNAUTHORIZED).json({message: 'É necessário estar logado para realizar esta ação!'});
     }
     try {
          const secret = process.env.SECRET;
          jwt.verify(token, secret);
          next();
     } catch (error) {
          response.status(HTTPS.BAD_REQUEST).json({message: 'Sua sessão expirou!'});
     }
}

module.exports = auth;