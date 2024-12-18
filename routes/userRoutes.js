const router = require("express").Router();
const { showSignInForm, createUser } = require("../controllers/userController");

router.get("/signin", showSignInForm);

router.post("/signin", createUser);

module.exports = router;
