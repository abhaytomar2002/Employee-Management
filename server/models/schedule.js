import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({ 
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shifts: {
    morning: { type: Boolean },
    evening: { type: Boolean },
    night: { type: Boolean }
  },

  employeeSchedules: [{
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "EmployeeProfile" },
    days: {
      monday: [{ type: String }],
      tuesday: [{ type: String }],
      wednesday: [{ type: String }],
      thursday: [{ type: String }],
      friday: [{ type: String }],
      saturday: [{ type: String }],
      sunday: [{ type: String }],
    }
  }],

  createdAt: { type: Date, default: new Date() }
})

const schedule = mongoose.model('Schedule', scheduleSchema)

export default schedule