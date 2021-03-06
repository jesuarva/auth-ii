const jwt = require('jsonwebtoken');
const secrets = require('../_secrets/secrets');

module.exports = {
  generateToken: function(data) {
    const options = {
      expiresIn: '1h',
    };
    const payload = { ...data };
    return jwt.sign(payload, secrets.jsk_secret, options);
  },
  userHasToken: function(req, res, next) {
    const token = req.headers.authorization;
    if (!token) res.status(401).json('You must be registered/logged in before go on');
    jwt.verify(token, secrets.jsk_secret, (err, tokenDecoded) => {
      req.token = token;
      req.decodedToken = tokenDecoded;
      // req.JWT(token);
      err ? res.status(500).json({ Error: 'Oh ohh, We can not validate your credentials, try again!' }) : next();
    });
  },
};
