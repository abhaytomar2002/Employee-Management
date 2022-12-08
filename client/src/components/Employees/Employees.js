import React, { useEffect, useState } from 'react';
import EmployeesList from "./EmployeesList";
import { useDispatch, useSelector } from "react-redux";
import { Container } from '@mui/material';
import { getEmployees } from '../../actions/employees';
import { getJobTitles } from '../../actions/jobTitle'
import Stats from './Stats/Stats';

export default function Employees({ setNotify }) {
  const { data, error, success } = useSelector((state) => state.employees)
  const jobTitles = useSelector((state) => state.jobTitle)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployees())
    dispatch(getJobTitles())
    
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }
    document.title = "List of employees"
  }, [error, success])

  return (
    <Container>
      <Stats employees={data} /> 
      <EmployeesList 
        employees={data} 
        jobTitles={jobTitles} 
        setNotify={setNotify} 
      />
    </Container>
  )
}
