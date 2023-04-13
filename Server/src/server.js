const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

//TODO auth
// const authenticateJWT = require('./auth/authenticate');
// const adminAuth = require('./auth/adminOnly');
// const authHandler = require('./auth/authHandler');

const {join} = require('path');
const express = require('express');

const angularAppPath = join(__dirname, '..', 'public', 'angular');

//TODO cors-proxy

const app = express();
app.use(express.json());
app.use('/static', express.static('./public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/config', authenticateJWT, adminAuth, require('./controllers/config/config.routes'));
app.use('/configs', require('./controllers/config/config.routes'));
app.use('/hardwares', require('./controllers/hardware/hardware.routes'));

app.use('/', express.static(angularAppPath));
app.all('*', (req, res) => {
  res.redirect('/')
});

app.use('/', (err, req, res, next) => {
  logger.error(`ERROR ${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message
  })
});

module.exports = app;
// module.exports = apiWrapper;