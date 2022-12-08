import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTitle, updateJobTitle } from "../../../actions/jobTitle";


export default function Form({setOpenPopup, currentId, setNotify}) {
  const initialData = { name: '', description:''}
  const [jobTitleData, setJobTitleData] = useState(initialData)
  const { data, error, success } = useSelector(state => state.jobTitle)
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()

  const validate = (fieldValues = jobTitleData) => {
    let temp = {...errors}

    if('name' in fieldValues)
      temp.name = fieldValues.name ? "": "This field is required"
    if('description' in fieldValues)
      temp.description = fieldValues.description ? (fieldValues.description.length >250 ? "The maximum length of the description is 250 characters" : "") : "This field is required"

    setErrors({ ...temp })

    if(fieldValues == jobTitleData)
      return Object.values(temp).every(x => x == "")
  }

  const handleChange = (e) => {
      const { name, value } = e.target
      setJobTitleData({ ...jobTitleData, [name]: value })
      validate({[name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      if(currentId) {
        dispatch(updateJobTitle(currentId, jobTitleData))
      }
      else {
        dispatch(createJobTitle(jobTitleData));
      }
  
      setOpenPopup(false)
      clear()
    }
  }

  useEffect(() => {
    const jobTitle = data.find(item => item._id === currentId)
    if(jobTitle) setJobTitleData(jobTitle)

    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }
  }, [data, error, success])

  const clear = () => {
    setJobTitleData(initialData)
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField sx={{mt: 1}} name="name" variant="outlined" label="Name" fullWidth autoFocus 
          value={jobTitleData.name} onChange={handleChange} {...(errors?.name && {error:true, helperText:errors.name})} />
        <TextField sx={{mt: 1}} name="description" variant="outlined" label="Description" multiline maxRows={4} minRows={4} fullWidth 
          value={jobTitleData.description} onChange={handleChange} {...(errors?.description && {error:true, helperText:errors.description})} />
        <Button sx={{mt: 3}} variant="contained" color="secondary" size="large" type="submit" fullWidth>Submit</Button>
        <Button sx={{mt: 1}} variant="outlined" color="gray" size="small" onClick={() => {
          clear()
          setOpenPopup(false)}
        } fullWidth>Cancel</Button>
      </form>
    </Container>
  )
}