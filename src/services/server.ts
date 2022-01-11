import express from 'express';
import path from 'path';
import http from 'http';
import { router } from '../routes/index.routes';
import swaggerUI from 'swagger-ui-express';
import swDocument from '../utils/swagger.def';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// El swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swDocument));

// Expone los endpoints signup y login

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.use('/', router);

export default server;
