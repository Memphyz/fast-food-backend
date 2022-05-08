const User = require("../../models/User");
const HTTPS = require("../../utils/responses");
const router = require("./create");

router.get("/", async (requisition, response) => {
  const users = await User.find();
  response.status(HTTPS.OK).json(users);
});

module.exports = router;
