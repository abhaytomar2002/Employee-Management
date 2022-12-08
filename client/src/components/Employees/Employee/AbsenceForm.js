import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, Container } from '@mui/material';
import { createAbsence, updateAbsence } from '../../../actions/employees';

export default function AbsenceForm({id, setOpenPopup, types, currentId, error, success, setNotify}) {
  const initialData = { absenceType:'', startDate:'', endDate: ''}
  const [absenceData, setAbsenceData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validate = (fieldValues = absenceData) => {
    let temp = {...errors}

    if('absenceType' in fieldValues)
      temp.absenceType = fieldValues.absenceType.length != 0 ? "" : "This field is required"
    if('startDate' in fieldValues)
      temp.startDate =  fieldValues.startDate ? "": "This field is required"
    if('endDate' in fieldValues)
      temp.endDate = fieldValues.endDate < absenceData.startDate ? "The end date must be greater than the start date" : fieldValues.endDate ? "": "This field is required"

    setErrors({ ...temp })

    if(fieldValues == absenceData)
      return Object.values(temp).every(x => x == "")
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setAbsenceData({ ...absenceData, [name]:value })
      validate({[name]: value})
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(validate()) {
      if(currentId) {
        dispatch(updateAbsence(currentId, id, absenceData))
      }
      else {
        dispatch(createAbsence(id, absenceData))
      }
      setOpenPopup(false)
      clear()
    }
  }
  
  const clear = () => { 
    setAbsenceData(initialData) 
    setErrors({})
  }

  useEffect(()=> {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }

  }, [error, success])

  return (
    <Container>
      <form onSubmit={handleSubmit} autoComplete="off">
        <FormControl sx={{mt: 1}} fullWidth {...(errors?.absenceType && {error:true})}>
          <InputLabel htmlFor="absenceType">Veids</InputLabel>
          <Select labelId="absenceType" label="Veids" name="absenceType" onChange={handleChange} value={absenceData.absenceType}>
            {types.map((item) => (
              <MenuItem key={item.id} value={item.type}>{item.name}</MenuItem>
            ))}
          </Select>
          {errors?.absenceType && <FormHelperText>{errors.absenceType}</FormHelperText> }
        </FormControl>
        <TextField sx={{mt: 1.5}} name="startDate" variant="outlined" label="Start date" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={absenceData.startDate.slice(0,10)} onChange={handleChange} {...(errors?.startDate && {error:true, helperText:errors.startDate})} />
        <TextField sx={{mt: 1.5}} name="endDate" variant="outlined" label="End date" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={absenceData.endDate.slice(0,10)} onChange={handleChange} {...(errors?.endDate && {error:true, helperText:errors.endDate})} />
        <Button sx={{mt: 3}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Maintain</Button>
        <Button sx={{mt: 1}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
          } fullWidth>Atcelt</Button>
      </form>
    </Container>
  )
}
