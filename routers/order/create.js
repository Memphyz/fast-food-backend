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
     body('products.*.name')
          .exists()
          .withMessage('O nome do produto deve ser informado!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('O nome do produto não deve ser vazio!')
          .custom(minLength(2))
          .withMessage('O nome do produto deve conter no mínimo 2 caracteres!')
          .custom(maxLength(50))
          .withMessage('O nome do produto deve conter no máximo 50 caracteres!')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome do produto deve conter apenas letras!'),
     body('products.*.description')
          .exists()
          .withMessage('A descrição do produto deve ser informada!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('A descrição do produto não deve ser vazia!')
          .custom(minLength(5))
          .withMessage('A descrição do produto deve conter no mínimo 5 caracteres!')
          .custom(maxLength(255))
          .withMessage('A descrição do produto deve conter no máximo 255 caracteres!'),
     body('products.*.price')
          .exists()
          .withMessage('O preço do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O preço do produto não deve ser vazio!')
          .isNumeric()
          .withMessage('O preço do produto deve ser um número!'),
     body('products.*.active')
          .exists()
          .withMessage('O status do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O status do produto não deve ser vazio!')
          .isBoolean()
          .withMessage('O status do produto deve ser um booleano!'),
     body('products.*.image')
          .exists()
          .withMessage('A imagem do produto deve ser informada!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('A imagem do produto não deve ser vazia!')
          .isURL()
          .withMessage('A imagem do produto deve ser uma URL válida!'),
     body('products.*.restaurant')
          .exists()
          .withMessage('O restaurante do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O restaurante do produto não deve ser vazio!')
          .isMongoId()
          .withMessage('O restaurante do produto deve ser um ID válido!'),
     body('products.*.client')
          .exists()
          .withMessage('O cliente do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O cliente do produto não deve ser vazio!')
          .isMongoId(),
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
               address: {
                    ...requisition.body.address,
                    number: +requisition.body.address.number,
                    postal: +requisition.body.address.postal,
                    user: decoded.id
               },
               status: 'CONFIRM_ORDER'
          }
          await Order.create(requisition.body).then((order) => {
               response.status(HTTPS.CREATED).json({message: 'Pedido criado com sucesso!', id: order.id})
          })
     }

)

module.exports = router;