const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
// logger
// http errors

const userDB = [
  { _id: 1, "email": "t@ester.com", "password": "user_pw", role: "USER" },
  { _id: 2, "email": 'admin@tester.com', "password": "admin_pw", role: "ADMIN" }
];

const refreshDB = [];


//* access
exports.login = (req, res, next) => {
  if (!req.body['email'] || !req.body['password']) {
    res.status(400).send('Missing email or password');
  };

  // Lekérdezés a DB-ből
  const user = userDB.find(u => u.email === req.body['email'] && u.password === req.body['password']);

  if (!user) {
    return res.status(404).send('Invalid email or password')
  };

  const accessToken = jwt.sign({
    email: user.email,
    // password: user.password,
    role: user.role,
    user_id: user._id
  }, process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

  //TODO refreshtoken
  const refreshToken = jwt.sign({
    email: user.email,
    // password: user.password,
    role: user.role,
    _id: user._id
  }, process.env.REFRESH_TOKEN_SECRET_KEY);

  refreshDB.push(refreshToken);
  res.json({
    accessToken,
    refreshToken, 
    user: {
      email: user.email,
      role: user.role,
      _id: user._id
    }
  });

};

//* refresh
exports.refresh = (req, res, next) => {
  const refreshToken = req.body['refreshToken'];

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  // DB-ben ellenőrizni a tokent
  const foundToken = refreshDB.includes(refreshToken);
  if (foundToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, payLoad) => {
      if (err) {
        return res.sendStatus(403);
      };

      const accessToken = jwt.sign({
        email: payLoad.email,
        // password: payLoad.password,
        _id: payLoad._id,
        role: payLoad.role
      }, process.env.ACCESS_TOKEN_SECRET_KEY,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });

      res.json({ accessToken });

    });
  } else {
    res.sendStatus(404);
  }
};

exports.logout = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const tokenId = refreshDB.findIndex(t => t === refreshToken);
  if (tokenId >= 0) {
    refreshDB.splice(tokenId, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(403)
  }
};

exports.me = (req, res, next) => {
  if(req.headers.authorization){
  // const authorization = req.headers.authorization;
    // const token = authorization.split(' ')[1];
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
      if (!err) {
        res.json({ user })
      }
    })
  } else {
    logger.error('Auth of headers not found')
  }
}

// {"email": "t@ester.com", "password": "user_pw"}

// {"email": "admin@tester.com, "password": "admin_pw"}
// {"refreshToken": ""}