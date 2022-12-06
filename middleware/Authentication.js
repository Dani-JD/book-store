function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.red = req.originalUrl;
    res.redirect(`/api/v1/auth/login`);
  }
}
function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/api/v1/books');
  } else {
    next();
  }
}

module.exports = { isAuthenticated, isNotAuthenticated };
