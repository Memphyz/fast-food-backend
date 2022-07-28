const {Router} = require("express");
const {body} = require("express-validator");
const jwt = require("jsonwebtoken");
const Order = require("../../models/Order");
const includeAudit = require("../../utils/audit-data");
const auth = require("../../utils/check-token");
const me = require("../../utils/me");
const HTTPS = require("../../utils/responses");
const validate = require("../../utils/validate");
const {maxLength, minLength, length} = require("../../utils/validators");

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
          .matches(/^(CASH|CREDIT_CARD|DEBIT_CARD|CHECK|PIX)$/)
          .withMessage('O método de pagamento informado não existe!'),
     body('rating')
          .isEmpty()
          .withMessage('A avaliação não deve ser informada durante o registro do pedido'),
     body('overview')
          .isEmpty()
          .withMessage('A avaliação não deve ser informada durante o registro do pedido'),
     body('address')
          .exists()
          .withMessage('O endereço deve ser informado!')
          .notEmpty()
          .withMessage('O endereço não pode ser vazio!')
          .isMongoId()
          .withMessage('O endereço deve ser um mongo id válido!'),
     validate,
     auth,
     includeAudit,
     async (requisition, response) => {
          const secret = process.env.SECRET;
          const authorization = requisition.headers.authorization.split(' ')[1],
               decoded = jwt.verify(authorization, secret);
          requisition.body = {
               ...requisition.body,
               user: decoded.id,
               status: 'CONFIRM_ORDER'
          }
          await Order.create(requisition.body).then((order) => {
               response.status(HTTPS.CREATED).json({message: 'Pedido criado com sucesso!', id: order.id})
          })
     }

)

module.exports = router;