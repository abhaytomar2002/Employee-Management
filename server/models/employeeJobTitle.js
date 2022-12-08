import mongoose from 'mongoose';

const jobTitleSchema = mongoose.Schema({
  name: String, 
  description: String,
  createdAt: { type: Date, default: new Date() },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" }],
})

const jobTitle = mongoose.model('JobTitle', jobTitleSchema)

export default jobTitle