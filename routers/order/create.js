const {Router} = require("express");
const {body} = require("express-validator");
const includeAudit = require("../../utils/audit-data");
const auth = require("../../utils/check-token");
const validate = require("../../utils/validate");
const {maxLength} = require("../../utils/validators");

const router = Router();

router.post('/',
     body('started')
          .isEmpty()
          .withMessage('A hora de criação deve estar vazia!'),
     body('deliveryTime')
          .isEmpty()
          .withMessage('A hora de entrega deve estar vazia!'),
     body('ended')
          .isEmpty()
          .withMessage('A hora de finalização não deve ser informada!'),
     body('user')
          .exists()
          .withMessage('O id do usuário deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O id do usuário não pode ser vazio!')
          .isAlphanumeric()
          .withMessage('O id do usuário deve ser alfanumérico')
          .isMongoId()
          .withMessage('O id do usuário deve ser um mongo id!'),
     body('products')
          .exists()
          .withMessage('A lista de produtos não pode ser nula!')
          .notEmpty()
          .withMessage('A lista de produtos não pode ser vazia!')
          .isArray({min: 1})
          .withMessage('A lista de produtos deve conter ao menos 1 produto!'),
     body('products.*.id')
          .exists()
          .withMessage('O id do produto deve ser informado!')
          .notEmpty()
          .withMessage('O id do produto não pode ser vazio!')
          .isAlphanumeric()
          .withMessage('O id do produto deve ser alfanumérico!')
          .isMongoId()
          .withMessage('O id do produto deve ser um mongo id!'),
     body('products.*.notes')
          .optional()
          .custom(maxLength(255))
          .withMessage('As observações do produto deve ter no máximo 255 caracteres!'),
     body('payment')
          .exists()
          .withMessage('O pagamento deve ser informado!')
          .notEmpty()
          .withMessage('O pagamento não deve ser vazio!')
          .isString()
          .withMessage('O tipo de pagamento informado é inválido!')
          .matches(/^(CASH|CREDIT_CARD|DEBIT_CARD|CHECK|PIX)/)
          .withMessage('O método de pagamento informado não existe!'),
     validate,
     auth,
     includeAudit

)