const {Router} = require("express");
const {body} = require("express-validator");
const Order = require("../../models/Order");
const includeAudit = require("../../utils/audit-data");
const auth = require("../../utils/check-token");
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
          .withMessage('O endereço não pode ser vazio!'),
     body('address.country')
          .exists()
          .withMessage('O país deve ser informado!')
          .notEmpty()
          .withMessage('O país não pode ser vazio!')
          .custom(minLength(2))
          .withMessage('O país deve conter no mínimo 2 caracteres!')
          .matches(/^(BRAZIL)$/)
          .withMessage('Os serviços dessa aplicação por hora não cobrem outro país a não ser o Brasil'),
     body('address.street')
          .exists()
          .withMessage('O nome da rua deve ser informado!')
          .notEmpty()
          .withMessage('O nome da rua não pode ser vazio!')
          .custom(minLength(2))
          .withMessage('O nome da rua deve conter no mínimo 2 caracteres!')
          .custom(maxLength(80))
          .withMessage('O nome da rua deve conter no máximo 80 caracteres!'),
     body('address.postal')
          .exists()
          .withMessage('O CEP deve ser informado!')
          .notEmpty()
          .withMessage('O CEP não pode ser vazio!')
          .custom(length(8))
          .withMessage('O CEP deve ter a quantidade de 8 caracteres!'),
     body('address.neighborhood')
          .exists()
          .withMessage('O bairro deve ser informado!')
          .notEmpty()
          .withMessage('O bairro não pode ser vazio!')
          .custom(minLength(5))
          .withMessage('O bairro deve conter ao menos 5 caracteres!')
          .custom(maxLength(80))
          .withMessage('O Bairro deve conter no máximo 80 caracteres!'),
     body('address.number')
          .exists()
          .withMessage('O número do local deve ser informado!')
          .notEmpty()
          .withMessage('O número do local n deve ser vazio!')
          .custom(minLength(1))
          .withMessage('O número do local deve conter ao menos 1 caractere!')
          .custom(maxLength(8))
          .withMessage('O número do local deve conter no mãximo 8 caracteres!'),
     body('address.complement')
          .optional()
          .isAlphanumeric()
          .withMessage('O complemento deve ser alfanumérico')
          .custom(maxLength(60))
          .withMessage('O complemento deve conter no máximo 60 caracteres!'),
     body('address.type')
          .exists()
          .withMessage('O tipo de endereço deve ser informado!')
          .notEmpty()
          .withMessage('O tipo de endereço não pode ser vazio!')
          .matches(/^(COMMERCIAL|RESIDENTIAL|KINSHIP)$/)
          .withMessage('O tipo de endereço informado é inválido'),
     validate,
     auth,
     includeAudit,
     async (requisition, response) => {
          requisition.body = {
               ...requisition.body,
               address: {
                    ...requisition.body.address,
                    number: +requisition.body.address.number,
                    postal: +requisition.body.address.postal
               },
               status: 'CONFIRM_ORDER'
          }
          await Order.create(requisition.body).then((order) => {
               response.status(HTTPS.CREATED).json({message: 'Pedido criado com sucesso!', id: order.id})
          })
     }

)

module.exports = router;