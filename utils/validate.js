const {validationResult} = require("express-validator");


const validate = (requisition, response) => {
     validationResult(requisition).throw();
}

module.exports = validate;