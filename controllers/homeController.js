const { findOtherUsers } = require("../services/userService");

const showHomepage = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render("landing");
  } else {
   // const users = await findOtherUsers(req.user.id);
    return res.render("index", { user: req.user });
  }
};

module.exports = { showHomepage };
