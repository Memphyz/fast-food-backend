const {Router} = require("express");
const {body} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {minLength, maxLength, cpf} = require("./../../utils/validators");
const HTTPS = require("../../utils/responses");
const User = require("../../models/User");
const {validate} = require("../../models/User");
const CryptoJS = require("crypto-js")

const router = Router();

router.post('/login',
     body("email")
          .isEmail()
          .withMessage("O email está incorreto!")
          .custom(maxLength(50))
          .withMessage('O email não pode ter mais que 50 caracteres!'),
     body("cpf")
          .isLength({min: 11, max: 11})
          .withMessage("O formato do CPF está inválido")
          .custom(cpf)
          .withMessage("O CPF informado está inválido"),
     body("password")
          .exists({checkNull: true})
          .withMessage("A senha deve ser informada!")
          .notEmpty({ignore_whitespace: true})
          .withMessage("A senha não deve ser vazia!")
          .custom(minLength(5))
          .withMessage("A senha deve conter no mínimo 5 caracteres!")
          .custom(maxLength(15))
          .withMessage("a senha deve conter no máximo 5 caracteres"),
     validate,
     async (requisition, response) => {
          try {
               const body = requisition.body;
               if (!body.cpf && !body.email) {
                    response.status(HTTPS.FORBIDDEN).json({message: 'O CPF ou o E-mail não foi informado'});
                    return undefined;
               }
               const user = await User.findOne({
                    $or: [
                         {cpf: body.cpf},
                         {email: body.email}
                    ]
               });
               if (!user) {
                    response.status(HTTPS.FORBIDDEN).json({message: 'Usuário não encontrado!'});
                    return undefined;
               }
               const salt = await bcrypt.genSalt(12);
               const passwordMatch = await bcrypt.compare(body.password, user.password);
               if (!passwordMatch) {
                    response.status(HTTPS.FORBIDDEN).json({message: 'Senha inválida'});
                    return undefined;
               }
               const secret = process.env.SECRET;
               const token = jwt.sign({
                    id: user._id
               }, secret);
               const cryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), secret).toString()
               response.status(HTTPS.OK).json({title: 'Bom te ver por aqui!', message: `Bem vindo ${user.name} ${user.surname}!`, token, user: cryptedUser, id: process.env.SECRET})
          } catch (error) {
               response
                    .status(HTTPS.INTERNAL_SERVER_ERROR)
                    .json({error: error, message: error?.message});
          }
     })

module.exports = router;