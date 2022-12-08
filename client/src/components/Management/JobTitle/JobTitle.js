import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, Container, Typography, Divider } from '@mui/material';
import JobTitleForm from './JobTitleForm';
import JobTitleList from './JobTitleList';
import Popup from "../../Reusable/Popup";
import { getJobTitles } from '../../../actions/jobTitle';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ConfirmDialog from '../../Reusable/ConfirmDialog';

export default function JobTitle({ setNotify }) {
  const [popupType, setOpenPopupType] = useState()
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const [openPopup, setOpenPopup] = useState(false)
  const [currentId, setCurrentId] = useState()
  const { data, error, success } = useSelector((state) => state.jobTitle)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getJobTitles())
    document.title = "Employee Positions"
  },[])

  return (
    <>
      <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate('/')}><ArrowBackRoundedIcon /></IconButton>
      <Container>
        <Typography sx={{mt:3, mb:3}} variant='h4'>Job Positions</Typography>
        <Divider/>
      </Container>
      <Container>
        <Button
          sx={{mt:5, mb: 2, ml:3}}
          variant='contained'
          size='large'
          color="secondary"
          onClick={() => { 
            setOpenPopupType("add")
            setOpenPopup(true) 
          }}
        >
          Add
        </Button>
        
        <JobTitleList 
          setCurrentId={setCurrentId}
          jobTitles={data} 
          error={error}
          success={success}
          confirmDialog={confirmDialog} 
          setConfirmDialog={setConfirmDialog} 
          setOpenPopup={setOpenPopup} 
          setOpenPopupType={setOpenPopupType} 
          setNotify={setNotify}  
        />
      </Container>
        
      <Popup
        title={popupType==="add" ? "Add position" : "Edit the position"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {
          popupType==="add" ?
            <JobTitleForm setNotify={setNotify} setOpenPopup={setOpenPopup} />
          :
            <JobTitleForm setNotify={setNotify} currentId={currentId} setOpenPopup={setOpenPopup} />
        }
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  )
}
