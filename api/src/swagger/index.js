let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
