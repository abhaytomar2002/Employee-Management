import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config()

// User sign in (log in)
export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email }) // Find existing user in database
    
    if(!existingUser) return res.status(404).json({ message: "The user does not exist" }) // Message return if user does not exist
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
    if(!isPasswordCorrect) return res.status(400).json({ message: "The entered password is incorrect!" })
    
    const token = jwt.sign({ email:existingUser.email, id:existingUser._id }, process.env.TOKEN, {expiresIn: '8h' })
    
    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: "Failed to connect!" })
  }
}

// User sign up (register)
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  try {
    const existingUser = await User.findOne({ email }) // Find existing user in database
    
    if(existingUser) return res.status(400).json({ message: "User already exists" }) // Message return if user does not exist
    
    if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

    const token = jwt.sign({ email:result.email, id:result._id }, process.env.TOKEN, {expiresIn: '8h'} )

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Failed to register!" })
  }
}