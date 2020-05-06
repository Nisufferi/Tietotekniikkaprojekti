const cookieParser = require('cookie-parser');

module.exports = function(req, res, next) {
  const token = req.cookies['Bearer'];
  console.log(token);
  if (!token) return res.status(401).send('No token provided.');

  try {
    if (JSON.stringify(token) === JSON.stringify(process.env.THINGER_TOKEN)) {
      req.user = 'Verified';
      next();
    }
  } catch (error) {
    res.status(400).send('Token was not valid');
  }
};
