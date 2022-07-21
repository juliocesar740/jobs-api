import express from 'express';
import mongoose from 'mongoose';
import jobRoutes from './Routes/job';
import companyRoutes from './Routes/company';
import usersRoutes from './Routes/user';
import authRoutes from './Routes/auth';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authRoutes, usersRoutes, jobRoutes, companyRoutes);

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen('5000', async () => {
  await mongoose
    .connect('mongodb://localhost/jobs-api')
    .then((res) => console.log('Database is on'))
    .catch((err) => console.log('Problems to connect the database'));
  console.log('Server is on\nhttp://localhost:5000');
});
