import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getEmployee, deleteEmployee } from '../../../actions/employees';
import { getJobTitles } from '../../../actions/jobTitle';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Divider, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Popup from "../../Reusable/Popup";
import AbsenceForm from './AbsenceForm';
import AbsenceList from './AbsenceList';
import Form from '../Form/Form';
import ConfirmDialog from '../../Reusable/ConfirmDialog';
import PageNotFound from '../../ErrorPages/PageNotFound';
import Loader from '../../Reusable/Loader';

export default function Employee({ setNotify }) {

  const absenceTypes = [
    {id: 0, type: "vacation", name: "Vacation"},
    {id: 1, type: "sick", name: "Sick"},
    {id: 2, type: "other", name: "Other"},
  ]

  const { employee, isLoading, error, success } = useSelector((state) => state.employees)
  const [openPopup, setOpenPopup] = useState(false)
  const [popupType, setOpenPopupType] = useState()
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: '', subTitle: ''})
  const [currentId, setCurrentId] = useState()
  const [title, setTitle] = useState("Employee")
  const [load, setLoad] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  useEffect(() => {
    dispatch(getEmployee(id))
    dispatch(getJobTitles())
    document.title = title
    
    if(error) {
      setNotify({ isOpen: true, message: error , type: 'error' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }

    if(success) {
      setNotify({ isOpen: true, message: success , type: 'success' })
      dispatch({type: 'CLEAR_EMPLOYEES_MESSAGE'})
    }
  }, [id, error, success])

  // Case when employee does not exist/ has not been loaded in the state yet
  if(!employee) {
    setTimeout(() => {setLoad(false)} , 4000) // Show loader for 4 seconds before showing 404 page
    return (
      <>
        {load ? <Loader /> : <PageNotFound />}
      </>
    )
  }

  // Method to display date in format YYYY-MM-DD
  const shortDate = (data) => {
    return data.slice(0,10)
  }

  // Method to delete employee and navigate to Employees screen
  const deleteEmp = () => {
    setTimeout(() => {navigate('/', { replace: true })}, 100)
    dispatch(deleteEmployee(id))
  }

  return (
    <>
      {!isLoading ?
        <> 
          <IconButton sx={{mt:'1%', ml:'1%'}} onClick={()=> navigate('/')}><ArrowBackRoundedIcon /></IconButton>
          <Container sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Container sx={{mb:3}}>
              <Typography variant='h4'>{`${employee.firstName} ${employee.lastName}`}</Typography>
              <Divider />
              <Typography sx={{mt:2}}><b>Amats:</b> {employee.jobTitle?.name}</Typography>
              <Typography><b>E-mail:</b> {employee.email}</Typography>
              <Typography><b>Phone no.:</b> {employee.phone}</Typography>
              <Typography><b>Address:</b> {employee.address}</Typography>
              <Typography><b>Start date:</b> {shortDate(employee.startDate)}</Typography>
            </Container>

            <Container sx={{display: 'flex', flexDirection: 'column', justifyContent:"center", gap: 2}}>
              <Button variant='outlined' color="secondary" 
                onClick={() => {
                  setOpenPopup(true)
                  setOpenPopupType('employeeEdit')
                }}
              > Rediģēt </Button>
              <Button variant='contained' color='error' onClick={ () =>
                setConfirmDialog({
                  isOpen: true,
                  title: 'Delete an employee?',
                  subTitle: 'The data will be permanently deleted',
                  onConfirm: deleteEmp
                })
              }>Delete</Button>
            </Container>
          </Container>
          <Container>
            <Button size="large" variant="contained"
              sx={{ml:3}}
              color="secondary"
              onClick = {() => {
                setOpenPopup(true)
                setOpenPopupType('absence')
              }}>
              Pievienot
            </Button>

            {employee.absences.length === 0 ? 
              <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
                  <Typography variant='h4' sx={{mt: 20, fontWeight: 'bold'}}>There are no absences</Typography>
              </Container>
            :
              <AbsenceList 
                empId={employee._id} 
                absences={employee.absences} 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog} 
                setNotify={setNotify}
                setOpenPopup={setOpenPopup}
                setOpenPopupType={setOpenPopupType}
                setCurrentId={setCurrentId}
                error={error}
                success={success}
              />
            }
          </Container>
        
          <Popup
            title={popupType==='absence' ? "Add absence" : popupType==='editAbsence' ? "Edit absence" :"Edit employee data"}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            {popupType==='absence' ?
              <AbsenceForm types={absenceTypes} id={id} setOpenPopup={setOpenPopup} error={error} success={success} setNotify={setNotify}/>
              :
              popupType==='editAbsence' ? 
                <AbsenceForm types={absenceTypes} id={id} currentId={currentId} setOpenPopup={setOpenPopup} error={error} success={success} setNotify={setNotify}/>
                :
                <Form currentId={id} setOpenPopup={setOpenPopup} setNotify={setNotify}  />
            }
          </Popup>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      :
        <Loader />
      }
    </>
  )
}
