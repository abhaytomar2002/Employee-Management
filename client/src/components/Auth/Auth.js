import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Grid, Container, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import { signin, signup } from  '../../actions/auth';
import { emailFormat, fieldRequired, matchingPasswords, passwordLength } from '../../Helpers/errorMessages'
import Loader from '../Reusable/Loader';

export default function Auth({ setNotify }) {
  const initialData = { firstName:'', lastName:'', email:'', password:'', confirmPassword:'' }
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const { error, success, isLoading } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  let navigate = useNavigate()

  const validate = (fieldValues = formData) => {
    let temp = {...errors}

    if('email' in fieldValues) 
      temp.email = fieldValues.email==="" ? fieldRequired : (/$^|.+@.+..+/).test(fieldValues.email) ? "": emailFormat    
    if('password' in fieldValues)
      temp.password = fieldValues.password ? "" : fieldRequired

    if(isSignup) {  
      if('firstName' in fieldValues)
        temp.firstName = fieldValues.firstName ? "" : fieldRequired
      if('lastName' in fieldValues)
        temp.lastName = fieldValues.lastName ? "" : fieldRequired
      if('password' in fieldValues) {
        temp.password = fieldValues.password ? "" : fieldRequired
        if(fieldValues.password.length < 8) temp.password = passwordLength
      }
      if('confirmPassword' in fieldValues)
        temp.confirmPassword = fieldValues.confirmPassword !== formData.password ? matchingPasswords : fieldValues.confirmPassword ? "" : fieldRequired
    }

    setErrors({ ...temp })

    if(fieldValues === formData)
      return Object.values(temp).every(x => x === "")
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
    validate({[name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
      if(isSignup){
        dispatch(signup(formData, navigate))
      } else {
        dispatch(signin(formData, navigate))
      } 
    }
  }

  const switchMode = () => {
    setIsSignup(prev => !prev)
    setErrors({})
  }
  const handleShowPassword = () => setShowPassword(prev => !prev)

  useEffect(() => {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'AUTH_CLEAR_ERROR', payload: null})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'AUTH_CLEAR_ERROR', payload: null})
    } 

    document.title = "Join the system"
  }, [error, success])

  return (
    <Container sx={ {mt:10 }} component='main' maxWidth='sm'>
      <Container sx={{ display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ mb:2 }} variant="h5">{ isSignup ? 'Register' : 'Login' }</Typography>
      </Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half error={errors.firstName} />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half error={errors.lastName} />
              </>
            )
          }
          <Input name="email" label="Email address" handleChange={handleChange} type="text" error={errors.email} />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} error={errors.password} />
          {isSignup && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" error={errors.confirmPassword} />}
        </Grid>
        <Button sx={{mt:2}} type="submit" color="secondary" variant='contained' fullWidth>
          { isSignup ? 'Register' : 'Login' }
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
              <Button onClick={switchMode}>
                  { isSignup ? 'Login!' : 'Register!' }
              </Button>
          </Grid>
        </Grid>
      </form>
      { isLoading && <Loader /> }
    </Container>
  )
}
