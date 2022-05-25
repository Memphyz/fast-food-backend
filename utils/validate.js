const {validationResult} = require("express-validator");
const HTTPS = require("./responses");


const validate = (requisition, response, next) => {
     if (validationResult(requisition).errors?.length) {
          const error = validationResult(requisition).errors[0];
          response.status(HTTPS.UNPROCESSABLE_ENTITY).json({field: error.param, message: error.msg, error});
     }
     next();
}

module.exports = validate;