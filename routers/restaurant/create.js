const {Router} = require("express");
const {body, validationResult} = require("express-validator");
const User = require("../../models/User");
const auth = require("../../utils/check-token");
const me = require("../../utils/me");
const HTTPS = require("../../utils/responses");
const validate = require("../../utils/validate");
const {minLength, maxLength, nonRequired, max, min, isHours, isNumber} = require("../../utils/validators");
const Restaurant = require('./../../models/Restaurant');


const router = Router();


router.post('/',
     body('name')
          .exists()
          .withMessage('O nome do restaurante deve ser informado!')
          .notEmpty({ignore_whitespace: false})
          .withMessage('O nome do restaurante não deve ser vazio!')
          .custom(minLength(5))
          .withMessage('O nome do restaurante deve conter no mínimo 5 caracteres!')
          .custom(maxLength(50))
          .withMessage('O nome do restaurante deve conter no máximo 50 caracteres!')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome do restaurante deve conter apenas letras!'),
     body('freight')
          .exists()
          .withMessage('O frete deve ser informado!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('O frete não deve ser vazio!')
          .isNumeric({no_symbols: true})
          .withMessage('O frete deve ser um número!'),
     body('kitchen')
          .exists()
          .withMessage('A cozinha deve ser informada!')
          .notEmpty({ignore_whitespace: true})
          .withMessage('A cozinha não deve ser vazia!')
          .custom(minLength(5))
          .withMessage('A cozinha deve conter no mínimo 5 caracteres!')
          .custom(maxLength(120))
          .withMessage('A cozinha deve conter no máximo 120 caracteres!')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('A cozinha deve conter apenas letras!'),
     body('created')
          .isEmpty({ignore_whitespace: true})
          .withMessage('A data de criação não deve ser informada!'),
     body('createdBy')
          .isEmpty({ignore_whitespace: true})
          .withMessage('O usuário de criação não deve ser informado!'),
     body('updated')
          .isEmpty({ignore_whitespace: true})
          .withMessage('A data de atualização não deve ser informada!'),
     body('updatedBy')
          .isEmpty({ignore_whitespace: true})
          .withMessage('O usuário de atualização não deve ser informado!'),
     body('address')
          .exists()
          .withMessage(`O endereço deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O endereço não deve ser vazio!`)
          .isObject({strict: true})
          .withMessage(`O endereço está incorreto!`),
     body('address.postalCode')
          .exists()
          .withMessage(`O CEP deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O CEP não deve ser vazio!`)
          .isNumeric({no_symbols: true})
          .withMessage(`O CEP deve ser um número!`)
          .isLength({min: 8, max: 8})
          .withMessage(`O CEP deve conter 8 caracteres!`)
     ,
     body('address.street')
          .exists()
          .withMessage(`A rua deve ser informada!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`A rua não deve ser vazia!`)
          .custom(minLength(5))
          .withMessage(`A rua deve conter no mínimo 5 caracteres!`)
          .custom(maxLength(255))
          .withMessage(`A rua deve conter no máximo 255 caracteres!`)
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage(`A rua deve conter apenas letras!`)
     ,
     body('address.number')
          .exists()
          .withMessage(`O número deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O número não deve ser vazio!`)
          .isNumeric({no_symbols: true})
          .withMessage(`O número deve ser um numérico!`)
          .custom(max(99999))
          .withMessage(`O número deve ser menor que 99999!`)
          .custom(min(1))
          .withMessage(`O número deve ser maior que 1!`),
     body('address.neighborhood')
          .exists()
          .withMessage(`O bairro deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O bairro não deve ser vazio!`)
          .custom(minLength(2))
          .withMessage(`O bairro deve conter no mínimo 2 caracteres!`)
          .custom(maxLength(255))
          .withMessage(`O bairro deve conter no máximo 255 caracteres!`)
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage(`O bairro deve conter apenas letras!`),
     body('address.city')
          .exists()
          .withMessage(`A cidade deve ser informada!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`A cidade não deve ser vazia!`)
          .custom(minLength(2))
          .withMessage(`A cidade deve conter no mínimo 2 caracteres!`)
          .custom(maxLength(50))
          .withMessage(`A cidade deve conter no máximo 50 caracteres!`)
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage(`A cidade deve conter apenas letras!`),
     body('address.state')
          .exists()
          .withMessage(`O estado deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O estado não deve ser vazio!`)
          .custom(minLength(2))
          .withMessage(`O estado deve conter no mínimo 2 caracteres!`)
          .custom(maxLength(20))
          .withMessage(`O estado deve conter no máximo 20 caracteres!`),
     body('address.complement')
          .optional({checkFalsy: true}),
     body('address.district')
          .exists()
          .withMessage(`O bairro deve ser informado!`)
          .notEmpty({ignore_whitespace: true})
          .withMessage(`O bairro não deve ser vazio!`)
          .custom(minLength(2))
          .withMessage(`O bairro deve conter no mínimo 2 caracteres!`)
          .custom(maxLength(50))
          .withMessage(`O bairro deve conter no máximo 50 caracteres!`)
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage(`O bairro deve conter apenas letras!`),
     body('active')
          .optional({checkFalsy: true})
          .isBoolean()
          .withMessage(`O status deve ser informado!`),
     body('open')
          .exists()
          .withMessage('A hora de abertura deve ser informada!')
          .custom(isHours)
          .withMessage('A hora de abertura deve ser uma hora válida!'),
     body('close')
          .exists()
          .withMessage('A hora de fechamento deve ser informada!')
          .custom(isHours)
          .withMessage('A hora de fechamento deve ser uma hora válida!'),
     body('register')
          .custom(nonRequired)
          .withMessage(`A data de cadastro não deve ser informada!`),
     body('update')
          .custom(nonRequired)
          .withMessage(`A data de atualização não deve ser informada!`),
     body('rate')
          .exists()
          .custom(isNumber)
          .withMessage(`A avaliação deve ser um número!`)
          .custom(max(5))
          .withMessage(`A avaliação deve ser menor que 5!`)
          .custom(min(0))
          .withMessage(`A avaliação deve ser maior que 0!`)
     ,
     body('payments')
          .isArray({min: 1, max: 10})
          .withMessage('Deve haver no mínimo 1 e no máximo 10 tipos de pagamentos!'),
     body('owners')
          .isArray({min: 1, max: 10})
          .withMessage('Deve haver no mínimo 1 e no máximo 10 proprietários!'),
     body('products')
          .isArray({min: 0, max: 200})
          .withMessage('O máximo de produtos cadastrados é 200!'),
     validate,
     auth,
     async (requisition, response) => {
          try {

               const users = requisition.body.owners;
               const body = requisition.body;
               users?.forEach(async (userId) => {
                    const user = await User.findById(userId);
                    if (!user) {
                         requisition.status(HTTPS.UNPROCESSABLE_ENTITY).json({message: `Usuário ${userId} não encontrado!`})
                    }
               });
               me(requisition, response).then((user) => {
                    body.created = new Date();
                    body.createdBy = `${user.name} ${user.surname}`
                    Restaurant.create(body).then(() => {
                         response.status(HTTPS.CREATED).json({message: `Restaurante ${body.name} criado com sucesso!`});
                    })
               });
          } catch (errors) {
               response.status(HTTPS.INTERNAL_SERVER_ERROR).json({errors});
          }
     });

module.exports = router;