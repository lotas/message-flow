const SlackAuth = require('../../models/SlackAuth');

function authMiddleware(req, res, next) {
  const mfAuth = req.cookies.mfAuth;
  if (!mfAuth) {
    return res.sendStatus(401);
  }

  req.user = null;

  SlackAuth.findOne({
    session_token: mfAuth
  })
  .exec((err, slackAuth) => {
    if (err) {
      debug('SlackAuth:', err);
      return res.sendStatus(403);
    }
    req.user = slackAuth;
    next();
  });

}

module.exports = authMiddleware;
