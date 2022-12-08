import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Container, FormControl, FormLabel, FormGroup, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { createSchedule } from "../../../actions/schedule";
import { fieldRequired } from '../../../Helpers/errorMessages';

export default function ScheduleForm({ setOpenPopup }) {
  const dispatch = useDispatch()
  const initialData = {
    shifts:{
      morning: false,
      evening: false,
      night: false
    },
    selectedDate: ''
  }

  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(initialData)

  const validate = (fieldValues = formData) => {
    let temp = {...errors}

    if('selectedDate' in fieldValues)
      temp.selectedDate = fieldValues.selectedDate ? "" : fieldRequired
    
    setErrors({ ...temp })

    if(fieldValues == formData)
      return Object.values(temp).every(x => x == "")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(validate()) {
      dispatch(createSchedule(formData))
      setOpenPopup(false)
    }
  }

  const clear = () => { 
    setFormData(initialData)
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      shifts: {
        ...formData.shifts,
        [name]: checked
      }
    })
  }

  const handleSelect = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]:value })
    validate({[name]: value})
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField sx={{mt: 1}}  name="selectedDate" variant="outlined" label="Choose a week" type="date" InputLabelProps={{shrink:true}} fullWidth 
          value={formData.selectedDate.slice(0,10)} onChange={handleSelect} {...(errors?.selectedDate && {error:true, helperText:errors.selectedDate})} />
        <FormControl sx={{mt: 1.5}}  component="fieldset" variant="standard">
          <FormLabel id="radio-label">Selection of shift:</FormLabel>
          <FormGroup>
            <FormControlLabel name="shiftCount" value="1" control={
              <Checkbox checked={formData.shifts.one} onChange={handleChange} name="morning" />
            } label="Morning" />
            <FormControlLabel name="shiftCount" value="1" control={
              <Checkbox checked={formData.shifts.two} onChange={handleChange} name="evening" />
            } label="Evening" />
            <FormControlLabel name="shiftCount" value="1" control={
              <Checkbox checked={formData.shifts.three} onChange={handleChange} name="night" />
            } label="Night" />
          </FormGroup>
        </FormControl>
        <Button sx={{mt: 3}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Create</Button>
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
