import { addHours, startOfWeek, endOfWeek } from 'date-fns';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';
import EmployeeProfile from '../models/employeeProfile.js';

// Create new schedule
export const createSchedule = async (req, res) => {
  const data = req.body
  const selectedDate = new Date(data.selectedDate)

  // Object with formatted data
  let formatData = {
    startDate: addHours(startOfWeek(selectedDate, {weekStartsOn: 1}), 2),
    endDate: addHours(endOfWeek(selectedDate, {weekStartsOn: 1}), 2),
    shifts: {
      morning: data.shifts.morning,
      evening: data.shifts.evening,
      night: data.shifts.night
    },
    employeeSchedules: []
  }

  try {
    const schedules = await Schedule.find()
    const employeeList = await EmployeeProfile.find()
    
    // Add data to formatData employeeSchedules property
    for(const emp of employeeList) {
      formatData = {...formatData, employeeSchedules: [...formatData.employeeSchedules, {employee: emp}]}
    }
  
    // Check if date ranges are not overlapping
    if(schedules.some(i => (i.startDate.toISOString().slice(0,10) <= formatData.endDate.toISOString().slice(0,10)) && (formatData.startDate.toISOString().slice(0,10) <= i.endDate.toISOString().slice(0,10))))
      return res.status(400).json({ message: "The schedule for this time period has been already added!" })

    // Check if at least one shift is selected
    if(!formatData.shifts.morning && !formatData.shifts.evening && !formatData.shifts.night)
      return res.status(400).json({ message: "Choose atleast one shift!" })

    const schedule = new Schedule(formatData)

    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    res.status(409).json({ message:error.message })
  }
}

// Get all Schedules
export const getSchedules = async (req, res) => {
  try {
    const schedules =  await Schedule.find().populate('shifts')
    res.status(200).json(schedules)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// Get specific Schedule
export const getSchedule = async (req, res) => {
  const { id } = req.params

  try {
    const schedule =  await Schedule.findById(id).populate('shifts employeeSchedules.employee employeeSchedules.employee.absences')
    res.status(200).json(schedule)
  } catch (error) {
    res.status(404).json({ message: "Schedule not found!" })
  }
}

// Update specific Schedule shifts
export const updateSchedule = async (req, res) => {
  const { id, empId } = req.params
  const data = req.body

  try {
    const updatedSchedule = await Schedule.findOneAndUpdate({"_id": id, "employeeSchedules._id": empId}, { 
        $set: {
          "employeeSchedules.$.days" : data.employeeSchedules
        }
     }, { new: true }).populate("shifts employeeSchedules.employee employeeSchedules.employee.absences")

    res.json(updatedSchedule)
  } catch (error) {
    res.status(404).json({ message: "Schedule not found!"})
  }
}

// Delete specific Schedule
export const deleteSchedule = async (req, res) => {
  const { id } = req.params
  try {
    const schedule = await Schedule.findById(id)
    await schedule.remove()
    res.status(200).json(id)
  } catch (error) {
    res.status(404).json({ message: "An error has occurred!"})
  }
}