const router = require("express").Router();
const { showHomepage } = require("../controllers/homeController");

router.get("/", showHomepage);

module.exports = router;
