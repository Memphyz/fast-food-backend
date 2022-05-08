const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const HTTPS = require("../../utils/responses");

const router = Router();

const minLength = (value) => {
  if (!value || value.length < 3) {
    throw Error("O campo deve ser maior que 3 caracteres!");
  }
  return true;
};

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
    .isEmpty({ ignore_whitespace: true })
    .withMessage("O CPF não foi informado!")
    .isLength({ length: 11 })
    .withMessage("O CPF está inválido"),
  body("name").exists({ checkNull: true }).isAlpha().custom(minLength),
  body("surname")
    .exists({ checkNull: true })
    .isAlpha("pt-BR")
    .withMessage("O sobrenome deve ser alfanumérico"),
  body("password")
    .exists({ checkNull: true })
    .notEmpty({ ignore_whitespace: true }),
  async (requisition, response) => {
    try {
      var err = validationResult(requisition);
      if (!err.isEmpty()) {
        const error = Object.values(err.mapped())[0];
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
