const HTTPS = require("./responses");

const verifyJWT = (req, res, next) => {
     const token = req.headers['x-access-token'];
     if (!token) {
          return res.status(HTTPS.UNAUTHORIZED).json({auth: false, title: 'Você não está logado!', message: 'Para utilizar este recurso, é necessário estar logado.'});
     }

     jwt.verify(token, process.env.SECRET, (err, decoded) => {
          if (err) {
               return res.status(HTTPS.UNAUTHORIZED).json({auth: false, title: 'Sua sessão expirou!', message: 'Retorne para a tela de login, e realize o login novamente'});
          }

          req.userId = decoded.id;
          next();
     });
}