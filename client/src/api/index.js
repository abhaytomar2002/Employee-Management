import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000' })
const API = axios.create({ baseURL: 'https://employee-management-vr7w.onrender.com' })

API.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})

// Employee API calls
export const fetchEmployees = () => API.get('/employees')
export const createEmployee = (newEmployee) => API.post('/employees', newEmployee)
export const updateEmployee = (id, updatedData) => API.patch(`/employees/${id}`, updatedData)
export const fetchEmployee = (id) => API.get(`/employees/${id}`)
export const deleteEmployee = (id) => API.delete(`/employees/${id}`)

// Employee absence API calls
export const createAbsence = (id, absence) => API.post(`/employees/${id}/absence`, absence)
export const updateAbsence = (id, empId, newData) => API.patch(`/employees/${empId}/${id}/absence`, newData)
export const deleteAbsence = (id, empId) => API.delete(`/employees/${empId}/${id}/absence`)

// Job Title API calls
export const createJobTitle = (newJobTitle) => API.post(`/manage/jobtitle`,newJobTitle)
export const fetchJobTitles = () => API.get('/manage/jobtitle')
export const updateJobTitle = (id, jobTitle) => API.patch(`/manage/jobtitle/${id}`, jobTitle)
export const deleteJobTitle = (id) => API.delete(`/manage/jobTitle/${id}`)

// Schedule API calls
export const getSchedules = () => API.get(`/schedules`)
export const getSchedule = (id) => API.get(`/schedules/${id}`)
export const createSchedule = (schedule) => API.post(`/schedules`, schedule)
export const updateSchedule = (id, empId, schedule) => API.patch(`/schedules/${id}/employee/schedule/${empId}`, schedule)
export const deleteSchedule = (id) => API.delete(`/schedules/${id}`)

// Auth API calls
export const signIn = (formData) => API.post('/user/signin', formData)
export const signUp = (formData) => API.post('/user/signup', formData)