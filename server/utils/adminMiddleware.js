const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const secret = process.env.auth_secret;

const withAuth = function(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    logger.info('ADMIN_MIDDLEWARE/ Unauthorized: No token provided')
    res.status(401).json({message:'Unauthorized: No token provided'});
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        logger.info('ADMIN_MIDDLEWARE/ Unauthorized: Invalid token')
        res.status(401).json({message:'Unauthorized: Invalid token'});
      } else {
        req.userData = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;