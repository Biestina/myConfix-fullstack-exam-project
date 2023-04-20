require('dotenv').config();
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

//TODO auth
const authenticateJWT = require('./auth/authenticate');
// const adminAuth = require('./auth/adminOnly');
const authHandler = require('./auth/authHandler');

const logger = require('./config/logger');
const {join} = require('path');
const express = require('express');

const angularAppPath = join(__dirname, '..', 'public', 'angular');

//TODO proxy

const app = express();
const apiWrapper = express();
apiWrapper.use('/api', app);

app.use(express.json());
app.use('/static', express.static('./public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/login', authHandler.login);
app.post('/refresh', authHandler.refresh);
app.post('/logout', authHandler.logout);
app.get('/me', authHandler.me);

app.use('/myconfigs', authenticateJWT, require('./controllers/config/config.routes'));
app.use('/hardwares', require('./controllers/hardware/hardware.routes'));
app.use('/users', require('./controllers/user/user.routes'));

apiWrapper.use('/', express.static(angularAppPath));
apiWrapper.get('*', (req,res) => {
  res.sendFile(angularAppPath + '/index.html')
})

app.use('/', (err, req, res, next) => {
  logger.error(`ERROR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message
  })
});

module.exports = apiWrapper;