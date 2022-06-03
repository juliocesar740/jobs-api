import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

app.listen('5000', () => {
  console.log('Server is on\nhttp://localhost:5000');
});
