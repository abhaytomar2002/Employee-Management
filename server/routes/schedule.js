import express from "express";
import { getSchedule, createSchedule, getSchedules, updateSchedule, deleteSchedule } from '../controllers/schedule.js'
import auth from "../middleware/auth.js";

const router = express.Router()

// Schedule routes, accessible only to registered user
router.get('/', auth, getSchedules) // GET method to get all Schedules
router.get('/:id', auth, getSchedule) // GET method to get selected Schedule
router.post('/', auth, createSchedule) // POST to create a Schedule
router.patch('/:id/employee/schedule/:empId', auth, updateSchedule) // PATCH method to update Schedule
router.delete('/:id', auth, deleteSchedule) // DELETE method to delete Schedule

export default router