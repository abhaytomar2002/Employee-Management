import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Route imports
import employeeRoutes from './routes/employees.js';
import userRoutes from './routes/user.js';
import jobTitleRoutes from './routes/jobTitle.js';
import scheduleRoutes from './routes/schedule.js';

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// Available API paths
app.use('/user', userRoutes)
app.use('/employees', employeeRoutes)
app.use('/manage/jobtitle', jobTitleRoutes)
app.use('/schedules', scheduleRoutes)

// Listen to port 5000 if no port in environmental variable
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))