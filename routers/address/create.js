const {Router} = require("express");
const {body} = require("express-validator");
const includeAudit = require("../../utils/audit-data");
const auth = require("../../utils/check-token");
const HTTPS = require("../../utils/responses");
const jwt = require("jsonwebtoken");
const validate = require("../../utils/validate");
const {minLength, maxLength, length, nonRequired} = require("../../utils/validators");
const Address = require("../../models/Address");

const router = Router();

router.post('/',
     body('user')
          .isEmpty()
          .withMessage('O usuário não deve ser informado'),
     body('country')
          .exists()
          .withMessage('O país deve ser informado!')
          .notEmpty()
          .withMessage('O país não pode ser vazio!')
          .custom(minLength(2))
          .withMessage('O país deve conter no mínimo 2 caracteres!')
          .matches(/^(BRAZIL)$/)
          .withMessage('Os serviços dessa aplicação por hora não cobrem outro país a não ser o Brasil'),
     body('city')
          .exists()
          .withMessage('A cidade deve ser informada!')
          .notEmpty()
          .withMessage('A cidade não pode ser vazia!')
          .custom(minLength(2))
          .withMessage('A cidade deve conter no mínimo 2 caracteres!')
          .custom(maxLength(50))
          .withMessage('A cidade deve conter no máximo 50 caracteres!'),
     body('state')
          .exists()
          .withMessage('O estado deve ser informado!')
          .notEmpty()
          .withMessage('O estado não pode ser vazio!')
          .custom(minLength(2))
          .withMessage('O estado deve conter no mínimo 2 caracteres!')
          .custom(maxLength(50))
          .withMessage('O estado deve conter no máximo 50 caracteres!'),
     body('address')
          .exists()
          .withMessage('O nome da rua deve ser informado!')
          .notEmpty()
          .withMessage('O nome da rua não pode ser vazio!')
          .custom(minLength(2))
          .withMessage('O nome da rua deve conter no mínimo 2 caracteres!')
          .custom(maxLength(80))
          .withMessage('O nome da rua deve conter no máximo 80 caracteres!'),
     body('reference')
          .custom(minLength(2))
          .withMessage('O ponto de referência deve conter no mínimo 2 caracteres!')
          .custom(maxLength(100))
          .withMessage('O ponto de referência deve conter no máximo 100 caracteres!'),
     body('postalCode')
          .exists()
          .withMessage('O CEP deve ser informado!')
          .notEmpty()
          .withMessage('O CEP não pode ser vazio!')
          .custom(length(8))
          .withMessage('O CEP deve ter a quantidade de 8 caracteres!'),
     body('district')
          .exists()
          .withMessage('O bairro deve ser informado!')
          .notEmpty()
          .withMessage('O bairro não pode ser vazio!')
          .custom(minLength(5))
          .withMessage('O bairro deve conter ao menos 5 caracteres!')
          .custom(maxLength(80))
          .withMessage('O Bairro deve conter no máximo 80 caracteres!'),
     body('number')
          .exists()
          .withMessage('O número do local deve ser informado!')
          .notEmpty()
          .withMessage('O número do local n deve ser vazio!')
          .custom(minLength(1))
          .withMessage('O número do local deve conter ao menos 1 caractere!')
          .custom(maxLength(5))
          .withMessage('O número do local deve conter no mãximo 5 caracteres!')
          .isNumeric()
          .withMessage('O número do endereço deve ser do tipo numérico!'),
     body('complement')
          .optional()
          .isAlphanumeric()
          .withMessage('O complemento deve ser alfanumérico')
          .custom(maxLength(60))
          .withMessage('O complemento deve conter no máximo 60 caracteres!'),
     body('type')
          .exists()
          .withMessage('O tipo de endereço deve ser informado!')
          .notEmpty()
          .withMessage('O tipo de endereço não pode ser vazio!')
          .matches(/^(COMMERCIAL|RESIDENTIAL|KINSHIP)$/)
          .withMessage('O tipo de endereço informado é inválido'),
     body('created')
          .custom(nonRequired)
          .withMessage('A data de criação do endereço não deve ser informada!'),
     body('createdBy')
          .custom(nonRequired)
          .withMessage('O usuário de criação do endereço não deve ser informado!'),
     validate,
     auth,
     includeAudit,
     async (requisition, response) => {
          const secret = process.env.SECRET;
          const authorization = requisition.headers.authorization.split(' ')[1],
               decoded = jwt.verify(authorization, secret);
          requisition.body = {
               ...requisition.body,
               user: decoded.id
          },
               Address.create(requisition.body).then(() => {
                    response.status(HTTPS.CREATED).json({message: 'Endereço criado!'})
               })
     });

module.exports = router;