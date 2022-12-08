import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputAdornment, TableBody, TableCell, TableRow, Toolbar, IconButton, Button, TextField, Tooltip } from "@mui/material";
import useTable from "../Reusable/useTable";
import { Search } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import EmployeesLoadingSkeleton from "./EmployeesLoadingSkeleton";
import Popup from "../Reusable/Popup";
import Form from "./Form/Form";
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';

export default function EmployeesList({ employees, jobTitles, setNotify }) {
  const showLoading = useSelector((state) => state.employees.isLoading)
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [openPopup, setOpenPopup] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  const headCells = [
    { id: 'status', label: 'Status', disableSorting: true},
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'jobTitle', label: 'Job title' },
    { id: 'actions', label: 'Actions', disableSorting: true }
  ]

  const getStatus = (item) => {
    const type = item.absences.filter(item => item.startDate < currentDate.toISOString() && item.endDate > currentDate.toISOString())[0]?.absenceType
    if(type === "vacation") return "statusVacation"
    else if(type === "sick") return "statusSick"
    else if(type === "other") return "statusOther"
    else return "statusActive"
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(employees, headCells, filter)

  const handleSearch = e => {
    const { value } = e.target

    setFilter({
      fn: items => {
        if(value ==="")
          return items
        else if(value===" ")
          return []
        else
          return items.filter(x => {
            const data = x.firstName.concat(" ", x.lastName).concat(" ", x.jobTitle.name || jobTitles.data.find(y => y._id === y.jobTitle)?.name)
            return data.toLowerCase().includes(value.toLowerCase())
          })
      }
    })
  }

  return (
    <>
      {!showLoading ? 
        <>
          <Toolbar sx={{
            display:'flex',
            justifyContent: 'space-between'
          }}>
            <Button size="large" variant="contained" color="secondary" onClick={() => setOpenPopup(true)}>Add</Button>
            <TextField label="to look for"
              InputProps={{ startAdornment:(<InputAdornment position="start"><Search /></InputAdornment>) }}
              sx={{ width:'35%' }}
              onChange={handleSearch}
            />
          </Toolbar>
          <TblContainer>
              <TblHead />
              <TableBody>
                {
                  recordsAfterPagingAndSorting().map(item => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell>
                          <Tooltip title={getStatus(item) === "statusActive" ? "Active" : getStatus(item) === "statusVacation" ? "On vacation" : getStatus(item)==="statusSick" ? "Sick" : "Other"}>
                            <CircleIcon color={getStatus(item)} />
                          </Tooltip>
                        </TableCell>
                        <TableCell>{item.firstName}</TableCell>
                        <TableCell>{item.lastName}</TableCell>
                        <TableCell>{item.jobTitle?.name || jobTitles.data.find(x => x._id === item.jobTitle)?.name}</TableCell>
                        <TableCell>
                          <IconButton component={Link} to={`/employees/${item._id}`}>
                            <SettingsIcon />
                          </IconButton>   
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
          </TblContainer>
          <TblPagination />
          <Popup
            title="Add employee"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <Form 
              setOpenPopup={setOpenPopup}
              setNotify={setNotify}
            />
          </Popup>

        </>
    : <EmployeesLoadingSkeleton />}
    </>
  )
}