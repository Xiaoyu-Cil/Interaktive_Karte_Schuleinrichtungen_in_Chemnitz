const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const app = express();

const swaggerDocument = yaml.load(fs.readFileSync('./api-doc.yaml', 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});