const showHomepage = (req, res) => {
  if (req.isAuthenticated()) {
    res.render("index", { user: req.user });
  } else {
    res.render("landing");
  }
};

module.exports = { showHomepage };
