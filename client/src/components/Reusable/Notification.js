import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export default function Notification(props) {
  const { notify, setNotify } = props

  const handleClose = (e) => {
    setNotify({
      ...notify,
      isOpen: false
    })
  }

  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      sx={{mt:8}}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  )
}