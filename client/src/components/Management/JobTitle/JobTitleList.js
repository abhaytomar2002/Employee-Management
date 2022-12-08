import React, { useState, useEffect } from 'react'
import { TableBody, TableCell, TableRow, IconButton, Tooltip } from "@mui/material";
import useTable from '../../Reusable/useTable';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteJobTitle } from '../../../actions/jobTitle';

export default function AbsenceList({ setCurrentId, jobTitles, setNotify, error, success, confirmDialog, setOpenPopupType, setConfirmDialog, setOpenPopup }) {
  const [filter, setFilter] = useState({fn: items => { return items; }})
  const dispatch = useDispatch()

  const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description'},
    { id: 'count', label:'A lot of employees.', disableSorting: true },
    { id: 'properties', label:'Actions', disableSorting: true },
  ]

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(jobTitles, headCells, filter);

  const onDelete = (item) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteJobTitle(item._id))
  }

  useEffect(() => {
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_JOBTITLE_MESSAGE'})
    }
  }, [error, success])

  return (
    <>
      <TblContainer>
        <TblHead />
        <TableBody>
            {
              recordsAfterPagingAndSorting().map(item => {
                return (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <Tooltip title={item.description} placement="left">
                      <TableCell>
                        {
                          item.description.length > 15 ? `${item.description.substring(0,15)}...` : item.description
                        }
                      </TableCell>
                    </Tooltip>
                    <TableCell>{item.employees.length}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => { 
                        setOpenPopupType("edit")
                        setOpenPopup(true) 
                        setCurrentId(item._id)  
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => { 
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Delete a post?',
                          subTitle: 'The data will be permanently deleted',
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
