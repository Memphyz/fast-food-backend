const User = require("../models/User");
const HTTPS = require("./responses");
const jwt = require("jsonwebtoken");


const me = async (requisition) => {
     if (requisition.headers && requisition.headers.authorization) {
          var authorization = requisition.headers.authorization.split(' ')[1],
               decoded;
          const secret = process.env.SECRET;
          try {
               decoded = jwt.verify(authorization, secret);
          } catch (error) {
               requisition.status(HTTPS.UNAUTHORIZED).json({message: 'É necessário estar logado para realizar esta ação!'});
               throw Error(error)
          }
          const userId = decoded.id;
          return await User.findById(userId)
     }
}

module.exports = me;