import express from "express";
import { createJobTitle, getJobTitles, deleteJobTitle, updateJobTitle } from '../controllers/jobTitle.js';
import auth from "../middleware/auth.js";

const router = express.Router()

// Job Title routes, accessible only to registered user
router.post('/', auth, createJobTitle) // POST, create Job Title
router.get('/', auth, getJobTitles) // GET all Job Titles
router.patch('/:id', auth, updateJobTitle) // PATCH, update Job Title
router.delete('/:id', auth, deleteJobTitle) // DELETE, delete Job Title

export default router