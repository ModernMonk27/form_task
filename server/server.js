// Import necessary modules
import express from 'express';
import pool from './models/FormModel.js';
import mysql from 'mysql2';
import route from './userRoutes/routes.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';



// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/task/users',route)

app.use(errorHandler)
app.use(notFound)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


