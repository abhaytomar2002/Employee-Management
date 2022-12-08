import React, { useEffect, useState } from 'react'
import Popup from "../../Reusable/Popup";
import { Container, TableBody, TableCell, TableRow, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getSchedule, updateSchedule } from "../../../actions/schedule";
import { getEmployees } from "../../../actions/employees";
import { useParams, useNavigate } from 'react-router-dom';
import useTable from '../../Reusable/useTable';
import ShiftSelect from './ShiftSelect';

export default function Schedules() {
  const initialData = {
    id: '',
    employeeSchedules: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  }
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const { schedule, success, error }  = useSelector((state) => state.schedule)
  const employees = useSelector((state) => state.employees.data)
  const [editing, setEditing] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()  
  const [shift, setShift] = useState(initialData)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateSchedule(id, editing, shift))

    setShift(initialData) 
    setEditing(null)
  } 
  
  const handleChange = (e, day) => {
    const { value } = e.target
    setShift({...shift, employeeSchedules: {...shift.employeeSchedules, [day]: typeof value === 'string' ? value.split(',') : value }})
  }

  const addDays = (days) => {
    if(schedule.startDate) {
      let result
      result = new Date(schedule.startDate)
      result.setDate(result.getDate() + days)
      return result
    }
    return new Date()
  }

  const dayDates = {
    monday: addDays(0),
    tuesday: addDays(1),
    wednesday: addDays(2),
    thursday: addDays(3),
    friday: addDays(4),
    saturday: addDays(5),
    sunday: addDays(6)
  }
  
  const headCells = [
    { id: 'fullName', label: 'Full name', disableSorting: true },
    { id: 'monday', label: `Monday (${dayDates.monday.toISOString().slice(8,10)}/${dayDates.monday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'tuesday', label: `Tuesday (${dayDates.tuesday.toISOString().slice(8,10)}/${dayDates.tuesday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'wednesday', label: `Wednesday (${dayDates.wednesday.toISOString().slice(8,10)}/${dayDates.wednesday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'thursday', label: `Thursday (${dayDates.thursday.toISOString().slice(8,10)}/${dayDates.thursday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'friday', label: `Friday (${dayDates.friday.toISOString().slice(8,10)}/${dayDates.friday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'saturday', label: `Saturday (${dayDates.saturday.toISOString().slice(8,10)}/${dayDates.saturday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'sunday', label: `Sunday (${dayDates.sunday.toISOString().slice(8,10)}/${dayDates.sunday.toISOString().slice(5,7)})`, disableSorting: true },
    { id: 'edit', label: 'Edit', disableSorting: true }
  ]

  useEffect(() => {
    dispatch(getSchedule(id))
    dispatch(getEmployees())
    document.title = "Work Schedule"
    if(success || error) dispatch({type:'CLEAR_SCHEDULES_MESSAGE'})
  }, [success, error])
  
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedule.employeeSchedules, headCells, filter)
  
  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
      <Container maxWidth='xl'>
        <form onSubmit={handleSubmit}>
          <TblContainer sx={{width:'max-content'}}>
            <TblHead />
            <TableBody >
              {
                recordsAfterPagingAndSorting().map(item => {
                  const emp = employees.find(i => i?._id === item.employee?._id )
                  const checkDate = (day) => {
                    return emp?.absences.find(i => i.startDate <= day.toISOString() && i.endDate >= day.toISOString())?.absenceType
                  }
                  return (
                    <TableRow key={item._id}>
                      <TableCell>{ item.employee?.firstName ? `${item.employee?.firstName} ${item.employee?.lastName}` : `Deleted employee` }</TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.monday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.monday)} /> :
                              <ShiftSelect day={"monday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.monday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.monday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.monday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                            editing === item._id ? 
                              (
                                checkDate(dayDates.tuesday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.tuesday)} /> :
                                <ShiftSelect day={"tuesday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                              ) :
                              (checkDate(dayDates.tuesday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.tuesday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.tuesday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.wednesday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.wednesday)} /> :
                              <ShiftSelect day={"wednesday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.wednesday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.wednesday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.wednesday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.thursday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.thursday)} /> :
                              <ShiftSelect day={"thursday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.thursday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.thursday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.thursday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }                        
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.friday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.friday)} /> :
                              <ShiftSelect day={"friday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.friday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.friday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.friday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.saturday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.saturday)} /> :
                              <ShiftSelect day={"saturday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.saturday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.saturday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.saturday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            (
                              checkDate(dayDates.sunday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.sunday)} /> :
                              <ShiftSelect day={"sunday"} shifts={schedule.shifts} shift={shift.employeeSchedules} handleChange={handleChange} />
                            ) :
                            (checkDate(dayDates.sunday) ? <Chip sx={{ m: 0.5 }} label={checkDate(dayDates.sunday)}/> : schedule.employeeSchedules.find(i => i._id === item._id).days.sunday.map(j => (<Chip sx={{ m: 0.5 }} key={j} label={j} />)))
                        }
                      </TableCell>
                      <TableCell>
                        {
                          editing === item._id ? 
                            <>
                              <IconButton type="submit">
                                <DoneIcon />
                              </IconButton> 
                              <IconButton onClick={() => {
                                setEditing(null)
                                setShift(initialData) 
                              }}>
                                <CloseIcon />
                              </IconButton> 
                            </>
                          : item.employee?.firstName ?
                              <IconButton onClick={() => {
                                setEditing(item._id)
                                setShift({ ...shift, id: item._id }) 
                              }}>
                                <EditIcon />
                              </IconButton>
                            : ""
                        }
                      </TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </TblContainer>
        </form>
        <TblPagination />
      </Container>
    </>
  )
}
