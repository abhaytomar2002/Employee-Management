import mongoose from 'mongoose';
import JobTitle from '../models/employeeJobTitle.js';
import EmployeeProfile from '../models/employeeProfile.js';

// Get all job titles
export const getJobTitles = async (req, res) => {
  try {
    const jobTitles =  await JobTitle.find().populate('employees')
    res.status(200).json(jobTitles)
  } catch (error) {
    res.status(404).json({ message: "Radusies kļūda!" })
  }
}

// Get single job title
export const getJobTitle = async (req, res) => {
  const { id } = req.params
    
  try {
    const jobTitle = await JobTitle.findById(id).populate('employees')
    res.status(200).json(jobTitle)
  } catch (error) {
    res.status(404).json({ message: "Amats nav atrasts!" })
  }
}

// Create new job title
export const createJobTitle = async (req, res) => {
  const data = req.body
  const newJobTitle = new JobTitle(data)
  try {
    await newJobTitle.save()
    res.status(201).json(newJobTitle);
  } catch (error) {
    res.status(409).json({ message: "An error has occurred!" })
  }
}

// Update existing job title
export const updateJobTitle = async (req, res) => {
  const { id } = req.params
  const jobTitle = req.body

  try {
    const updatedJobTitle = await JobTitle.findByIdAndUpdate(id, jobTitle, { new: true }).populate("employees")
    res.json(updatedJobTitle)
  } catch (error) {
    res.status(404).json({ message: "No position found!"})
  }
}

// Delete job title
export const deleteJobTitle = async (req, res) => {
  const { id } = req.params
  try {
    const jobTitle = await JobTitle.findById(id).populate('employees')

    // Update all employees which has deleted job title
    for(const jobEmp of jobTitle.employees) {
      await EmployeeProfile.updateOne({"_id": jobEmp.id}, {jobTitle: null})
    }
    
    await jobTitle.remove()
    res.status(200).json(id)
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: "An error has occurred!" })
  }
}
