const config = require('config');
const port = config.port;
const logger = require('./config/logger');
const mongoose = require('mongoose');
const app = require('./server');

mongoose.connect(`mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`)
  .then(() => {
    logger.info('Mongodb connection is successful');
  })
  .catch(err => {
    logger.error(err);
    process.exit();
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})