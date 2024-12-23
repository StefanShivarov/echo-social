const router = require("express").Router();
const { showSignUpForm, signUpUser } = require("../controllers/userController");

router.get("/signup", showSignUpForm);
router.post("/signup", signUpUser);

module.exports = router;
