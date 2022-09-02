const User = require("../../models/User");
const pseudoAnon = require("../../utils/anon");
const HTTPS = require("../../utils/responses");
const router = require("./create");
const anonFields = ['cpf', 'password']
router.get("/", async (requisition, response) => {
  const {ids, anon, page, sort, limit, projection, search} = requisition.query
  try {
    if (ids) {
      const users = await findUsers({
        _id: {$in: ids},
      }, anon, limit, page, sort);
      response.status(HTTPS.OK).json(users);
      return undefined
    }
    const users = await findUsers(search, anon, limit, page, sort, projection);
    response.status(HTTPS.OK).json(users);
  } catch (error) {
    response
      .status(HTTPS.INTERNAL_SERVER_ERROR)
      .json({error: error, message: error?.message});
  }
});

const findUsers = async (search, anon, limit, page, sort, projection) => {
  const users = await User.find({name: {'$regex': (search || ''), '$options': 'i'}}, projection).limit(limit || 20).skip(page || 0).sort(sort || 'name');
  return pseudoAnon(anonFields, users, anon)
}

module.exports = router;
