const {me} = require("./me");

const includeAudit = async (requisition, response, next) => {
     const user = await me(requisition);
     const isArray = Array.isArray(requisition.body);
     if (isArray) {
          requisition.body.forEach(data => {
               data['created'] = new Date();
               data['createdBy'] = `${user.name} ${user.surname}`
          })
     } else {
          requisition.body['created'] = new Date();
          requisition.body['createdBy'] = `${user.name} ${user.surname}`
     }
     next();
};

module.exports = includeAudit;