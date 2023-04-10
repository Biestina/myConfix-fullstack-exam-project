const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const {join} = require('path');
const express = require('express');

const angularAppPath = join(__dirname, '..', 'public', 'angular');

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


module.exports = app;
// module.exports = apiWrapper;