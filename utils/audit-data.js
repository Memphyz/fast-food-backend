const me = require('./me')

const includeAudit = async (requisition, response, next) => {
     const user = await me(requisition);
     requisition.body['created'] = new Date();
     requisition.body['createdBy'] = `${user.name} ${user.surname}`
     next();
};

module.exports = includeAudit;