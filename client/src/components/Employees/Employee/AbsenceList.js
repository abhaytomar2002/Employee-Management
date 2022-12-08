import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow, IconButton } from "@mui/material";
import { deleteAbsence } from '../../../actions/employees';
import useTable from "../../Reusable/useTable";
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function AbsenceList({ empId, absences, confirmDialog , setConfirmDialog, setOpenPopup, setOpenPopupType, setCurrentId }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'absenceType', label: 'Type' },
    { id: 'startDate', label: 'From'},
    { id: 'endDate', label:'Up to' },
    { id: 'actions', label: 'Actions', disableSorting:true}
  ]  

  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteAbsence(item._id, empId))
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(absences, headCells, filter)

  return (
  <>
    <TblContainer>
      <TblHead />
      <TableBody>
        {
          recordsAfterPagingAndSorting().map(item => {
            return (
              <TableRow key={item._id}>
                <TableCell>{item.absenceType === 'vacation' ? "Vacation" : item.absenceType === 'sick' ? "Sick" : "Other"}</TableCell>
                <TableCell>{item.startDate.slice(0,10)}</TableCell>
                <TableCell>{item.endDate.slice(0,10)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => { 
                      setOpenPopupType("editAbsence")
                      setOpenPopup(true) 
                      setCurrentId(item._id)  
                    }}>
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => { 
                    setConfirmDialog({
                      isOpen: true,
                      title: 'Delete an absence record?',
                      subTitle: 'The data will be permanently deleted.',
                      onConfirm: () => onDelete(item)
                    })      
                  }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </TblContainer>
    <TblPagination />
  </>
  )
}
