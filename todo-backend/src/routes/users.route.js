const router = require("express").Router();
const { 
  register, 
  authorization, 
} = require("../controllers/users.controller");

router.post("/user/register", register);
router.post("/user/authorization", authorization);

module.exports = router;
