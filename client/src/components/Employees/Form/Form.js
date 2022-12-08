import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from "../../../actions/employees";
import { emailFormat, phoneFormat, fieldRequired } from '../../../Helpers/errorMessages'

export default function Form({ currentId, setOpenPopup }) {
  const initialData = { firstName:'', lastName:'', phone: '', email:'', address: '',  startDate: '', jobTitle:'' }
  const [employeeData, setEmployeeData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const { employee } = useSelector((state) => state.employees)
  const jobTitleList = useSelector((state) => state.jobTitle.data)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData({ ...employeeData, [name]:value })
    validate({[name]: value})
  }

  // Form validation rules
  const validate = (fieldValues = employeeData) => {
    let temp = {...errors}

    if('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? "": fieldRequired
    if('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? "": fieldRequired
    if('startDate' in fieldValues)
      temp.startDate = fieldValues.startDate ? "" : fieldRequired
    if('phone' in fieldValues)
      temp.phone = fieldValues.phone==="" ? fieldRequired 
        : (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g).test(fieldValues.phone) 
        ? "" : phoneFormat

    if('email' in fieldValues)
      temp.email = fieldValues.email==="" ? fieldRequired : (/$^|.+@.+..+/).test(fieldValues.email) ? "" : emailFormat
    if('address' in fieldValues)
      temp.address = fieldValues.address ? "": fieldRequired
    if('jobTitle' in fieldValues)
      temp.jobTitle = fieldValues.jobTitle.length !==0 ? "": fieldRequired
    
    setErrors({ ...temp })

    if(fieldValues == employeeData)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      if(currentId){
        dispatch(updateEmployee(currentId,employeeData))
      } else {
        dispatch(createEmployee(employeeData))
      }
      setOpenPopup(false)
      clear()
    }
  }

  // Clear employeeData state and validation errors
  const clear = () => { 
    setEmployeeData(initialData)
    setErrors({})
  }

  useEffect(() => {
    if(employee) {
      if(employee.jobTitle === null) setEmployeeData({...employee, jobTitle: ''})
      else setEmployeeData(employee)
    } 
  }, [employee])

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField sx={{mt: 1}} name="firstName" variant="outlined" label="First Name" fullWidth autoFocus 
          value={employeeData.firstName} onChange={handleChange} {...(errors?.firstName && {error:true, helperText:errors.firstName})}  />
        <TextField sx={{mt: 1.5}} name="lastName" variant="outlined" label="Last Name" fullWidth 
          value={employeeData.lastName} onChange={handleChange} {...(errors?.lastName && {error:true, helperText:errors.lastName})} />
        <TextField sx={{mt: 1.5}} name="phone" variant="outlined" label="Phone no." type="text" fullWidth 
          value={employeeData.phone} onChange={handleChange} {...(errors?.phone && {error:true, helperText:errors.phone})} />
        <TextField sx={{mt: 1.5}} name="email" variant="outlined" label="E-mail" type="text" fullWidth 
          value={employeeData.email} onChange={handleChange} {...(errors?.email && {error:true, helperText:errors.email})} />
        <TextField sx={{mt: 1.5}} name="address" variant="outlined" label="Address" type="text" fullWidth 
          value={employeeData.address} onChange={handleChange} {...(errors?.address && {error:true, helperText:errors.address})} />
        <TextField sx={{mt: 1.5}} name="startDate" variant="outlined" label="Start Date" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={employeeData.startDate.slice(0,10)} onChange={handleChange} {...(errors?.startDate && {error:true, helperText:errors.startDate})} />
        <FormControl sx={{mt: 1.5}} fullWidth {...(errors?.jobTitle && {error:true})}>
          <InputLabel htmlFor="jobTitle">Amats</InputLabel>
          <Select labelId="jobTitle" label="Job title" name="jobTitle" onChange={handleChange} 
            value={employeeData.jobTitle ? (employeeData.jobTitle?._id || employeeData.jobTitle) : ""} >
            {jobTitleList.map((item) => (
              <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
            ))}
          </Select>
          {errors?.jobTitle && <FormHelperText>{errors.jobTitle}</FormHelperText> }
        </FormControl>

        <Button sx={{mt: 3}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
        <Button sx={{mt: 1}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
        } fullWidth>
          Cancel
        </Button>
      </form>
    </Container>
  )
}