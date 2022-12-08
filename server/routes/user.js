import express from "express";
import { signin, signup } from '../controllers/user.js';

const router = express.Router()

// User auth routes
router.post('/signin', signin) // POST method for user Log In
router.post('/signup', signup) // POST method for user Registration

export default router