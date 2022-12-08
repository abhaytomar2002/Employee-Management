import express from "express";
import {
  getEmployees, 
  createEmployee, 
  updateEmployee, 
  getEmployee, 
  createAbsence, 
  deleteEmployee, 
  deleteAbsence, 
  updateAbsence 
} from '../controllers/employees.js';
import auth from "../middleware/auth.js";

const router = express.Router()

// Employee routes, accessible only to registered user
router.get('/', auth, getEmployees) // GET method to get all employees
router.get('/:id', auth, getEmployee) // GET method to get specific employee
router.post('/', auth, createEmployee) // POST method to create employee
router.patch('/:id', auth, updateEmployee) // PATCH method to update employee
router.delete('/:id', auth, deleteEmployee) // DELETE method specific employee from ID

// Employee absence routes, accessible only to registered user
router.post('/:id/absence', auth, createAbsence) // POST method to create absence
router.patch('/:empId/:id/absence', auth, updateAbsence) // PATCH method to update absence
router.delete('/:empId/:id/absence', auth, deleteAbsence) // DELETE method to delete absence

export default router