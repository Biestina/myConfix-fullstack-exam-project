const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const {join} = require('path');
const express = require('express');

const angularAppPath = join(__dirname, '..', 'public', 'angular');

//TODO cors-proxy

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/config', authenticateJWT, adminAuth, require('./controllers/config/config.routes'));
app.use('/configs', require('./controllers/config/config.routes'));
app.use('/hardwares', require('./controllers/hardware/hardware.routes'));

module.exports = app;
// module.exports = apiWrapper;