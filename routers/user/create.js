const {Router} = require("express");
const {body} = require("express-validator");
const bcrypt = require("bcrypt");
const {minLength, maxLength, isDate, cpf} = require("./../../utils/validators");
const User = require("../../models/User");
const HTTPS = require("../../utils/responses");
const validate = require("../../utils/validate");

const router = Router();

router.post(
  "/",
  body("email")
    .exists({checkNull: true})
    .withMessage("O E-mail não foi informado")
    .notEmpty({ignore_whitespace: true})
    .withMessage("O E-mail não pode ser vazio!")
    .isEmail()
    .withMessage("O email está incorreto!")
    .custom(maxLength(50))
    .withMessage('O email não pode ter mais que 50 caracteres!'),
  body("cpf")
    .exists({checkNull: true})
    .withMessage("O CPF não foi informado!")
    .notEmpty({ignore_whitespace: true})
    .withMessage("O CPF não pode ser vazio!")
    .isLength({min: 11, max: 11})
    .withMessage("O formato do CPF está inválido")
    .custom(cpf)
    .withMessage("O CPF informado está inválido"),
  body("name")
    .exists({checkNull: true})
    .withMessage("O nome não foi informado!")
    .isAlpha('pt-BR')
    .withMessage("O nome deve conter apenas letras")
    .custom(minLength(3))
    .withMessage("O nome não possui a quantidade mínima de 3 caracteres!")
    .custom(maxLength(80))
    .withMessage("O nome deve conter no máximo 80 caracteres!"),
  body("surname")
    .exists({checkNull: true})
    .withMessage("O sobrenome deve ser informado!")
    .isAlpha("pt-BR", {ignore: ' '})
    .withMessage("O sobrenome deve conter apenas letras!")
    .custom(maxLength(80))
    .withMessage("O sobrenome deve conter no máximo 80 caracteres!"),
  body("password")
    .exists({checkNull: true})
    .withMessage("A senha deve ser informada!")
    .notEmpty({ignore_whitespace: true})
    .withMessage("A senha não deve ser vazia!")
    .custom(minLength(5))
    .withMessage("A senha deve conter no mínimo 5 caracteres!")
    .custom(maxLength(15))
    .withMessage("a senha deve conter no máximo 5 caracteres"),
  body("born")
    .exists({checkNull: true})
    .withMessage("A data de nascimento deve ser informada!")
    .notEmpty({ignore_whitespace: true})
    .withMessage("A data de nascimento não deve ser vazia!")
    .custom(isDate)
    .withMessage("A data de nascimento está inválida!"),
  validate,
  async (requisition, response) => {
    try {
      const body = requisition.body;
      const exist = await User.findOne({
        $or: [
          {cpf: body.cpf},
          {email: body.email}
        ]
      });
      if (exist) {
        response.status(HTTPS.UNPROCESSABLE_ENTITY).json({message: 'Já existe um usuário cadastrado com esse E-mail ou CPF!'});
        return undefined;
      }
      const salt = await bcrypt.genSalt(12);
      requisition.body.password = await bcrypt.hash(requisition.body.password, salt);
      await User.create(requisition.body).then(() => {
        response
          .status(HTTPS.CREATED)
          .json({message: "Usuário cadastrado com sucesso!"});
      });
    } catch (error) {
      response
        .status(HTTPS.INTERNAL_SERVER_ERROR)
        .json({error: error, message: error?.message});
    }
  }
);

module.exports = router;
