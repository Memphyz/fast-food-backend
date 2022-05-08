const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { cpf } = require("cpf-cnpj-validator");
const { minLength, maxLength } = require("./../../utils/validators");
const User = require("../../models/User");
const HTTPS = require("../../utils/responses");

const router = Router();

router.post(
  "/",
  body("email")
    .exists({ checkNull: true })
    .notEmpty({ ignore_whitespace: true })
    .withMessage("O E-mail não foi informado")
    .isEmail()
    .withMessage("O email está incorreto!"),
  body("cpf")
    .exists({ checkNull: true })
    .withMessage("O CPF não foi informado!")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("O CPF não pode ser vazio!")
    .isLength({ min: 11, max: 11 })
    .withMessage("O formato do CPF está inválido")
    .custom(cpf.isValid)
    .withMessage("O CPF informado está inválido"),
  body("name")
    .exists({ checkNull: true })
    .withMessage("O nome não foi informado!")
    .isAlpha()
    .withMessage("O nome deve conter apenas letras")
    .custom(minLength(3))
    .withMessage("O nome não possui a quantidade mínima de 3 caracteres!")
    .custom(maxLength(80))
    .withMessage("O nome deve conter no máximo 80 caracteres!"),
  body("surname")
    .exists({ checkNull: true })
    .withMessage("O sobrenome deve ser informado!")
    .isAlpha("pt-BR")
    .withMessage("O sobrenome deve conter apenas letras!")
    .custom(maxLength(80))
    .withMessage("O sobrenome deve conter no máximo 80 caracteres!"),
  body("password")
    .exists({ checkNull: true })
    .withMessage("A senha deve ser informada!")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("A senha não deve ser vazia!")
    .custom(minLength(5))
    .withMessage("A senha deve conter no mínimo 5 caracteres!")
    .custom(maxLength(15))
    .withMessage("a senha deve conter no máximo 5 caracteres"),
  body("born")
    .exists({ checkNull: true })
    .withMessage("A data de nascimento deve ser informada!")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("A data de nascimento não deve ser vazia!")
    .isDate({ format: "MM-dd-yyyy" })
    .withMessage("A data de nascimento deve ter o formato de uma data!"),
  async (requisition, response) => {
    try {
      const errorsFound = validationResult(requisition);
      if (!errorsFound.isEmpty()) {
        const error = Object.values(errorsFound.mapped())[0];
        response
          .status(HTTPS.UNPROCESSABLE_ENTITY)
          .json({ field: error.param, message: error.msg });
        return undefined;
      }
      await User.create(requisition.body).then(() => {
        response
          .status(HTTPS.CREATED)
          .json({ message: "Usuário cadastrado com sucesso!" });
      });
    } catch (error) {
      response
        .status(HTTPS.INTERNAL_SERVER_ERROR)
        .json({ error: error, message: error?.message });
    }
  }
);

module.exports = router;
