const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const User = require('../models/user.model');

const refreshDB = [];


exports.login = async (req, res, next) => {
  if (!req.body['email'] || !req.body['password']) {
    res.status(400).send('Missing email or password');
  };

  const user = await User.findOne({ email: req.body['email'], password: req.body['password'] });
  if (!user) {
    return res.status(404).send('Invalid email or password')
  };

  const accessToken = jwt.sign({
    email: user.email,
    role: user.role,
    _id: user._id
  }, process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });

  const refreshToken = jwt.sign({
    email: user.email,
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


exports.refresh = (req, res, next) => {
  const refreshToken = req.body['refreshToken'];

  if (!refreshToken) {
    return res.sendStatus(403);
  }

  const foundToken = refreshDB.includes(refreshToken);
  if (foundToken) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, payLoad) => {
      if (err) {
        return res.sendStatus(403);
      };

      const accessToken = jwt.sign({
        email: payLoad.email,
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
};