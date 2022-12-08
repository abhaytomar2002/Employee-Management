import React, { useEffect, useState } from 'react'
import ScheduleForm from './ScheduleForm'
import Popup from "../../Reusable/Popup";
import { Button, Container, TableBody, TableCell, TableRow, IconButton, Chip, Typography, Divider } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { deleteSchedule, getSchedules } from "../../../actions/schedule";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import useTable from '../../Reusable/useTable';
import ConfirmDialog from '../../Reusable/ConfirmDialog';

export default function Schedules({ setNotify }) {
  const [filter, setFilter] = useState({ fn: items => { return items } })
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const [openPopup, setOpenPopup] = useState(false)
  const schedules = useSelector((state) => state.schedule.data)
  const { error, success } = useSelector((state) => state.schedule)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const headCells = [
    { id: 'startDate', label: 'Start date' },
    { id: 'endDate', label: 'End date' },
    { id: 'shiftCount', label: 'Shift count', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true }
  ]

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
    dispatch(deleteSchedule(id))
  }

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(schedules, headCells, filter)

  useEffect(() => {
    dispatch(getSchedules())
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_SCHEDULES_MESSAGE'})

    }
    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_SCHEDULES_MESSAGE'})
    }
    document.title = "Work schedules"
  }, [error, success])

  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate(-1)}><ArrowBackRoundedIcon /></IconButton>
      <Container>
        <Typography sx={{mt:3, mb:3}} variant='h4'>Schedule list</Typography>
        <Divider/>
      </Container>
      <Container>
      <Button
        sx={{mt:5, mb: 2, ml:3}}
        variant='contained'
        size='large'
        color="secondary"
        onClick={() => { setOpenPopup(true) }}>Add</Button>
      <Container>
      <TblContainer>
        <TblHead />
        <TableBody>
          {
            recordsAfterPagingAndSorting().map(item => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.startDate.slice(0,10)}</TableCell>
                  <TableCell>{item.endDate.slice(0,10)}</TableCell>
                  <TableCell>
                    {item.shifts.morning ? <Chip sx={{m:0.5}} label="Morning" /> : ""}
                    {item.shifts.evening ? <Chip sx={{m:0.5}} label="Evening" /> : ""}
                    {item.shifts.night ? <Chip sx={{m:0.5}} label="Night" /> : ""}
                  </TableCell>
                  <TableCell>  
                    <IconButton onClick={() => { 
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Delete schedule entry?',
                        subTitle: 'The data will be permanently deleted',
                        onConfirm: () => onDelete(item._id)
                      })      
                    }}>
                      <DeleteIcon />
                    </IconButton>  
                    <IconButton component={Link} to={`/schedules/${item._id}`}>
                      <KeyboardArrowRightIcon />
                    </IconButton>   
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
        </TblContainer>
        <TblPagination />
      </Container>

      <Popup
        title="Time frame of schedule"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ScheduleForm setOpenPopup={setOpenPopup} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Container>
    </>
  )
}
