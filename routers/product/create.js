const {Router} = require("express");
const {body} = require("express-validator");
const Product = require("../../models/Product");
const Restaurant = require("../../models/Restaurant");
const includeAudit = require("../../utils/audit-data");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");
const validate = require("../../utils/validate");
const {maxLength, minLength, nonRequired} = require("../../utils/validators");


const router = Router();

router.post('/',
     body('name')
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
     body('description')
          .exists()
          .withMessage('A descrição do produto deve ser informada!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('A descrição do produto não deve ser vazia!')
          .custom(minLength(5))
          .withMessage('A descrição do produto deve conter no mínimo 5 caracteres!')
          .custom(maxLength(255))
          .withMessage('A descrição do produto deve conter no máximo 255 caracteres!'),
     body('price')
          .exists()
          .withMessage('O preço do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O preço do produto não deve ser vazio!')
          .isNumeric()
          .withMessage('O preço do produto deve ser um número!'),
     body('active')
          .exists()
          .withMessage('O status do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O status do produto não deve ser vazio!')
          .isBoolean()
          .withMessage('O status do produto deve ser um booleano!'),
     body('image')
          .exists()
          .withMessage('A imagem do produto deve ser informada!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('A imagem do produto não deve ser vazia!')
          .isURL()
          .withMessage('A imagem do produto deve ser uma URL válida!'),
     body('created')
          .custom(nonRequired)
          .withMessage('A data de criação do produto não deve ser informada!'),
     body('createdBy')
          .custom(nonRequired)
          .withMessage('O usuário de criação do produto não deve ser informado!'),
     body('restaurant')
          .exists()
          .withMessage('O restaurante do produto deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O restaurante do produto não deve ser vazio!')
          .isMongoId()
          .withMessage('O restaurante do produto deve ser um ID válido!'),
     body('additionals')
          .optional(),
     body('additionals.*.unitPrice')
          .exists()
          .withMessage('O preço unitário do adicional deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O preço unitário do adicional não deve ser vazio!')
          .isNumeric(),
     body('additionals.*.name')
          .exists()
          .withMessage('O nome do adicional deve ser informado!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('O nome do adicional não deve ser vazio!')
          .custom(minLength(2))
          .withMessage('O nome do adicional deve conter no mínimo 2 caracteres!')
          .custom(maxLength(50))
          .withMessage('O nome do adicional deve conter no máximo 50 caracteres!')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome do adicional deve conter apenas letras!'),
     body('additionals.*.description')
          .exists()
          .withMessage('A descrição do adicional deve ser informada!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('A descrição do adicional não deve ser vazia!')
          .custom(minLength(5))
          .withMessage('A descrição do adicional deve conter no mínimo 5 caracteres!')
          .custom(maxLength(255))
          .withMessage('A descrição do adicional deve conter no máximo 255 caracteres!'),
     body('additionals.*.notes')
          .optional()
          .custom(maxLength(255))
          .withMessage('As observações do adicional devem conter no máximo 255 caracteres!'),
     body('additionals.*.quantity')
          .optional()
          .isNumeric()
          .withMessage('A quantidade do adicional deve ser um número!'),
     body('additionals.*.total')
          .optional()
          .isNumeric()
          .withMessage('O total do adicional deve ser um número!'),

     validate, auth, includeAudit, (requisition, response) => {
          const body = {...requisition.body};
          try {
               Product.create(body).then((product) => {
                    Restaurant.updateOne({_id: body.restaurant}, {$push: {products: product._id}}).then(() => {
                         return response.status(HTTPS.CREATED).json({message: `Produto ${body.name} criado com sucesso!`});
                    })
               })
          } catch (error) {
               // return response.json({error: error, message: error?.message});
          }
     });

module.exports = router;