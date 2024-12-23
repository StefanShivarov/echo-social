const router = require("express").Router();
const { showDashboard } = require("../controllers/homeController");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { user: req.user });
  } else {
    res.render("landing");
  }
});

module.exports = router;
