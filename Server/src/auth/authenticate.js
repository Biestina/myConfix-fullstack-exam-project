const jwt = require('jsonwebtoken');

//TODO http-errors

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if(!authHeader) {
    res.sendStatus(401);
  };

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, payLoad) => {
    if(err){
      return res.sendStatus(403);
    };

    console.table(payLoad);
    req.user = payLoad;
    next()
  })

}